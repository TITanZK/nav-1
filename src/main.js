const $siteList = $('.siteList')
const $lastLi = $('.siteList').find('li.last')
const navList = localStorage.getItem('navList')
const navListObj = JSON.parse(navList)

//定义网址初始地址
const hashMap = navListObj || [
  {
    logo: 'A',
    url: 'https://www.aliyun.com/'
  },
  {
    logo: 'B',
    url: 'https://www.bootcss.com/'
  }
]

// 网址处理
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}

// 遍历hashMap，渲染数据
const rander = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`
      <li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-x"></use>
              </svg>
            </div>
          </div>
      </li>
    `).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation()   //阻止冒牌
      hashMap.splice(index, 1)
      rander()
    })
  })
}
rander()

// 添加网址
$('.addButton').on('click', () => {
  let url = window.prompt('要添加的网址是：')
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  })
  rander()
})

// 在即将离开当前页面(刷新或关闭)时执行
window.onbeforeunload = () => {
  const navData = JSON.stringify(hashMap)
  localStorage.setItem('navList', navData)
}

// 监听键盘事件
$(document).on('keypress', (e) => {
  const { key } = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})