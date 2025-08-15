import { scrape } from "@panha/scrape/";

const NAMES_SELECTOR = "#searchContent div.row:nth-of-type(2) .col-md-8 h3"
const LINK_SELECTOR = "#searchContent div.row:nth-of-type(2) .col-md-8 h3 > a"
const DESC_SELECTOR = "#searchContent div.row:nth-of-type(2) .col-md-8 div > ul"

const totalNames = 5375

// URL to query all names:
const url = "https://www.euskaltzaindia.eus/index.php?option=com_ecoeoda&task=bilaketa&Itemid=792&lang=es&query=*&mota=izenak"

// URL only with male names:
// const url = "https://www.euskaltzaindia.eus/index.php?option=com_ecoeoda&Itemid=792&task=bilaketa&view=bilaketa&lang=es&query=%2A%3A%2A&mota=izenak&ordena=score&sexua_facet[]=2&arautzea_facet[]=10";


const stripTabs = (s: string) => s.replaceAll("\t", "")
function extract(s: string) {
    const match = /(.+)\((.+)\)/.exec(s)
    if(match===null) return {}
    
    return {name:match[1], sex: match[2]}
}

try {
    const iters = Math.floor(totalNames / 10)
    let allNames = []

    for(let i=0; i<iters; i++) {
        const scraper = await scrape(`${url}&nondik=${i*10}`);
        const names = scraper.text(NAMES_SELECTOR).map(stripTabs);
        const descriptions = scraper.text(DESC_SELECTOR).map(stripTabs)
        const links = scraper.href(LINK_SELECTOR).map(stripTabs);

        console.log(names)
        allNames = names.reduce((ret, n, i) => {
            const {name, sex} = extract(n)

            if (!name) {
                console.error("Something went wrong with " + n)
                return ret
            }

            return [
                ...ret, {
                    name,
                    sex,
                    desc: descriptions[i],
                    link: links[i]
                }
            ]
        }, allNames)
    }
    console.log(allNames);

    await Deno.writeTextFile("names.json", JSON.stringify(allNames))
} catch (error) {
    console.error(error);
}