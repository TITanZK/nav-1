const $siteList = $('.siteList')
const $lastLi = $('.siteList').find('li.last')
const navList = localStorage.getItem('navList')
const navListObj = JSON.parse(navList)
//定义网址初始地址
const hashMap = navListObj || [
  {
    logo: 'A',
    url: 'https://www.acfun.cn'
  },
  {
    logo: 'B',
    url: 'https://bilibili.com'
  }
]
// 遍历hashMap，渲染数据
const rander = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    $(`
      <li>
        <a href="${node.url}">
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${node.url}</div>
          </div>
        </a>
      </li>
    `).insertBefore($lastLi)
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
    logo: url[0],
    url: url
  })
  rander()
})
// 在即将离开当前页面(刷新或关闭)时执行
window.onbeforeunload = () => {
  const navData = JSON.stringify(hashMap)
  localStorage.setItem('navList', navData)
}
