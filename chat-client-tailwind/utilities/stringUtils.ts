export class StringUtils {
    static toProperCase(str: string): string {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    static parseTemplate(template: string, vars: {[key: string]: string}): string {
        if(!template || !vars)
            return template;
        
        for(var key in vars) {
            let regex = new RegExp("{{"+ key + "}}", "ig");
            template = template
                .replace(regex, vars[key]);
        }

        return template;
    }

    static newGuid(): any {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }
    
    private static s4(): any {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    /*static loremIpsum(minWordCount: number = 3, maxWordCount: number = 40): string {
        var loremIpsumWordBank = new Array("lorem","ipsum","dolor","sit","amet,","consectetur","adipisicing","elit,","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua.","enim","ad","minim","veniam,","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat.","duis","aute","irure","dolor","in","reprehenderit","in","voluptate","velit","esse","cillum","dolore","eu","fugiat","nulla","pariatur.","excepteur","sint","occaecat","cupidatat","non","proident,","sunt","in","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum.","sed","ut","perspiciatis,","unde","omnis","iste","natus","error","sit","voluptatem","accusantium","doloremque","laudantium,","totam","rem","aperiam","eaque","ipsa,","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt,","explicabo.","nemo","enim","ipsam","voluptatem,","quia","voluptas","sit,","aspernatur","aut","odit","aut","fugit,","sed","quia","consequuntur","magni","dolores","eos,","qui","ratione","voluptatem","sequi","nesciunt,","neque","porro","quisquam","est,","qui","dolorem","ipsum,","quia","dolor","sit,","amet,","consectetur,","adipisci","velit,","sed","quia","non","numquam","eius","modi","tempora","incidunt,","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem.","ut","enim","ad","minima","veniam,","quis","nostrum","exercitationem","ullam","corporis","suscipit","laboriosam,","nisi","ut","aliquid","ex","ea","commodi","consequatur?","quis","autem","vel","eum","iure","reprehenderit,","qui","in","ea","voluptate","velit","esse,","quam","nihil","molestiae","consequatur,","vel","illum,","qui","dolorem","eum","fugiat,","quo","voluptas","nulla","pariatur?","at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus,","qui","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti,","quos","dolores","et","quas","molestias","excepturi","sint,","obcaecati","cupiditate","non","provident,","similique","sunt","in","culpa,","qui","officia","deserunt","mollitia","animi,","id","est","laborum","et","dolorum","fuga.","harum","quidem","rerum","facilis","est","et","expedita","distinctio.","Nam","libero","tempore,","cum","soluta","nobis","est","eligendi","optio,","cumque","nihil","impedit,","quo","minus","id,","quod","maxime","placeat,","facere","possimus,","omnis","voluptas","assumenda","est,","omnis","dolor","repellendus.","temporibus","autem","quibusdam","aut","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet,","ut","et","voluptates","repudiandae","sint","molestiae","non","recusandae.","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus,","aut","reiciendis","voluptatibus","maiores","alias","consequatur","aut","perferendis","doloribus","asperiores","repellat");

        var randy = Math.floor(Math.random()*(maxWordCount - minWordCount)) + minWordCount;
        var ret = "";
        for(let i = 0; i < randy; i++) {
            var newTxt = loremIpsumWordBank[Math.floor(Math.random() * (loremIpsumWordBank.length - 1))];
            if (ret.substring(ret.length-1,ret.length) == "." || ret.substring(ret.length-1,ret.length) == "?") {
                newTxt = newTxt.substring(0,1).toUpperCase() + newTxt.substring(1, newTxt.length);
            }
            ret += " " + newTxt;
        }
        return "Lorem ipsum " + ret.substring(0,ret.length-1);
    }*/

    static replace(text : string, type: string, replaceWith: string): string {
        try {
            if(type == "url") {
                return text.replace(/(\b(https?|http?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, replaceWith);
            }
        } catch (e) {
            return text;
        }
        
        return text;
    }
}