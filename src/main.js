const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const localList = localStorage.getItem('x')
const localListObject = JSON.parse(localList)
const hashMap = localListObject || [
    {
        text : 'V',
        name : 'vuejs',
        logo : 'https://cn.vuejs.org/images/icons/favicon-32x32.png',
        logoType : 'text',
        url : 'https://cn.vuejs.org/index.html'
    },
    {
        text : 'R',
        name : 'reactjs',
        logo : 'https://zh-hans.reactjs.org/favicon.ico',
        logoType : 'text',
        url : 'https://zh-hans.reactjs.org/'
    },
    {
        text : 'A',
        name : 'acfun',
        logo : '',
        logoType : 'text',
        url : 'https://www.acfun.cn/'
    },
    {
        text : 'B',
        name : 'bilibili',
        logo : 'https://www.bilibili.com/favicon.ico',
        logoType : 'ico',
        url : 'https://www.bilibili.com/'
    },
]

const parseUrl = (url) => {
   return url.replace('https://', '')
       .replace('http://', '')
       .replace('www.', '')
       .replace(/\/.*/, '')
}

const template = (node) => {
    // let urlName = parseUrl(node.url)
    return `<li>
                <div class="site">
                    <div class="logo">${node.text}</div>
                    <div class="link">${node.name}</div>
                    <div class="delete">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                </div>
            </li>`
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index )=> {
        const $li = $(template(node)).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.delete', (e) => {
            e.stopPropagation()
            console.log('delete')
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addSite')
    .on('click', () => {
        let url = window.prompt('新增网站')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        let name = parseUrl(url)
        let shortName = name.toUpperCase()
        let newSite = {
            text : shortName[0],
            name : name,
            logo : url[0],
            logoType : 'text',
            url : url
        }
        hashMap.push(newSite)
        render()
    })

window.onbeforeunload = () => {
    console.log('页面关闭')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    let {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        let h = hashMap[i]
        if (h.name[0] === key) {
            window.open(h.url)
        }
    }
})