const axios = require('axios');
const path = require('path');

exports.UdemyDownloader = {
    init: (courseID, token) => {
        return new udemyDownloader(courseID, token);
    }
}

function udemyDownloader(courseID, token) {
    this.getCourseFiles = () => {
        let courseMedia = [];

        getCourseChapters(courseID, token, (chapters) => {
            chapters.map((c, i) => {
                let chapter = {
                    id: c.chapter_id,
                    title: c.title,
                    lectures: []
                }

                courseMedia.push(chapter);
            });

            getCourseLectures(courseID, token, (lectures) => {
                lectures.map((l, i) => {
                    getLectureLink(courseID, token, l).then((lecture) => {
                        courseMedia.find(x => x.id == lecture.chapter_id).lectures.push(lecture);
                    });
                });
            });
        })

        console.log("DOWNLOADER", courseMedia)
        return courseMedia;
    }

    this.getCourseMedia = (courseID, token, callback) => {
        let courseMedia = [];

        let url = 'https://www.udemy.com/api-2.0/courses/'+courseID+'/cached-subscriber-curriculum-items?fields[asset]=@min,title,filename,asset_type,external_url,length&fields[chapter]=@min,description,object_index,title,sort_order&fields[lecture]=@min,object_index,asset,supplementary_assets,sort_order,is_published,is_free&fields[quiz]=@min,object_index,title,sort_order,is_published&page_size=550';
        let header = {
            'Authorization': token,
            'Access-Control-Allow-Origin': '*'
        }

        axios.get(url, {headers: header}).then((resp) => {
            
            if(resp.data.results){
                let results = resp.data.results;
    
                for(let i = 0, c = 0, l = results.length; i < l; i++) {
                    let r = results[i];
    
                    if(r._class === 'chapter') {
                        c++;

                        let chapter = {
                            chapter_id: c,
                            title: c + ". " + r.title.replace(":", " -"),
                            lectures: [],
                            object_index: r.object_index
                        }
    
                        courseMedia.push(chapter)
                    }else if(r._class === 'lecture') {
                        let lecture = {
                            chapter_id: c,
                            id: r.id,
                            title: r.title,
                            asset_id: r.asset.id,
                            asset_type: r.asset.asset_type,
                            object_index: r.object_index
                        }

                        getLectureLink(courseID, token, lecture).then((l) => {
                            courseMedia.find(x => x.chapter_id == l.chapter_id).lectures.push(l);
                        });
                    }
                }

                let sorted = courseMedia.slice(0);
                sorted.map((chapter, i) => {
                    sorted[i].lectures = sorted[i].lectures.sort((a, b) => {
                        a.object_index - b.object_index;
                    });
                });

                callback(sorted);
            }
        });
    }
}

function getCourseChapters(courseID, token, callback) {
    let url = 'https://www.udemy.com/api-2.0/courses/'+courseID+'/cached-subscriber-curriculum-items?fields[asset]=@min,title,filename,asset_type,external_url,length&fields[chapter]=@min,description,object_index,title,sort_order&fields[lecture]=@min,object_index,asset,supplementary_assets,sort_order,is_published,is_free&fields[quiz]=@min,object_index,title,sort_order,is_published&page_size=550';
    let header = {
        'Authorization': token,
        'Access-Control-Allow-Origin': '*'
    }

    axios.get(url, {headers: header}).then((resp) => {
        let chapters = [];

        if(resp.data.results){
            let results = resp.data.results;

            for(let i = 0, c = 1, l = results.length; i < l; i++) {
                let r = results[i];

                if(r._class === 'chapter') {
                    let chapter = {
                        chapter_id: c,
                        title: c + ". " + r.title.replace(":", " -")
                    }

                    chapters.push(chapter)
                    c++;
                }
            }
        }

        callback(chapters);
    });
}

function getCourseLectures(courseID, token, callback) {
    let url = 'https://www.udemy.com/api-2.0/courses/'+courseID+'/cached-subscriber-curriculum-items?fields[asset]=@min,title,filename,asset_type,external_url,length&fields[chapter]=@min,description,object_index,title,sort_order&fields[lecture]=@min,object_index,asset,supplementary_assets,sort_order,is_published,is_free&fields[quiz]=@min,object_index,title,sort_order,is_published&page_size=550';
    let header = {
        'Authorization': token,
        'Access-Control-Allow-Origin': '*'
    }

    axios.get(url, {headers: header}).then((resp) => {
        let lectures = [];

        if(resp.data.results){
            let results = resp.data.results;

            for(let i = 0, c = 0, l = results.length; i < l; i++) {
                let r = results[i];

                if(r._class === 'lecture') {
                    let lecture = {
                        chapter_id: c,
                        id: r.id,
                        title: r.title,
                        asset_id: r.asset.id,
                        asset_type: r.asset.asset_type,
                        object_index: r.object_index
                    }

                    lectures.push(lecture);
                }else{
                    c++
                }
            }
        }

        callback(lectures);
    });
}

function getLectureLink(courseID, token, lectureObj) {
    let url = 'https://www.udemy.com/api-2.0/users/me/subscribed-courses/' + courseID + '/lectures/' + lectureObj.id + '?fields[lecture]=@default,view_html,course&page_config=ct_v4';
    let header = {
        'Authorization': token,
        'Access-Control-Allow-Origin': '*'
    }

    return axios.get(url, {headers: header}).then((resp) => {
        let data = resp.data;
        let html = data.view_html;

        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(html, "text/html");

        //console.log(htmlDoc.getElementsByTagName('react-video-player')[0].attributes['videojs-setup-data'].nodeValue)

        if(lectureObj.asset_type === 'Video') {
            // lectureObj.filename = lectureObj.title.replace(":", " -").replace("/", "-") + ".mp4"; //data.asset.title;

            let videoPlayer = htmlDoc.getElementsByTagName('react-video-player');
            let videoChecker = videoPlayer.length;

            if(videoChecker > 0){
                let json = JSON.parse(videoPlayer[0].attributes['videojs-setup-data'].nodeValue);
                let link = getBestVideoQuality(json.sources);
                lectureObj.link = link;
            }  
        }
        return lectureObj;
    });
}

function getBestVideoQuality(sources) {
    let link = sources.find(x => x.label === '1080');

    if(!link || link === undefined || link === 'undefined' || link === ''){
        link = sources.find(x => x.label === '720p');
    }

    if(!link || link === undefined || link === 'undefined' || link === ''){
        link = sources.find(x => x.label === '480');
    }

    if(!link || link === undefined || link === 'undefined' || link === ''){
        link = sources.find(x => x.label === 'WebHD.mp4');
    }

    if(!link || link === undefined || link === 'undefined' || link === ''){
        link = sources.find(x => x.label === 'Web_144.mp4');
    }

    return link.src;
}