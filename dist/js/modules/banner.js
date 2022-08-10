

// 这是一个轮播图模块
define(['jquery'] , function($){

  let $bannerList = $('.banner-list')

  
  function initBanner(data){
      let html = `
      <ul>
          ${data.banner_list.map((v , i) => {
            return `<li class="${i === 0 ? 'show' : ''}"><a href="#"><img src="${v.imgUrl}" alt=""></a></li>`
          }).join('')}
      </ul>
      <ol>
          ${data.banner_list.map((v , i) => {
            return `<li class="${i === 0 ? 'active' : ''}"></li>`
          }).join('')} 
      </ol>
      `
      $bannerList.html(html)

      bindBanner()
  }

  function bindBanner(){
    let $ullis = $bannerList.find('ul li')
    let $ollis = $bannerList.find('ol li')
    let now = 0;
    $ollis.on('mouseover' , function(){
      $(this).addClass('active').siblings().removeClass('active')
      $ullis.eq( $(this).index() ).addClass('show').siblings().removeClass('show')
      now = $(this).index()
    })

    setInterval(function(){
      if(now === $ullis.length - 1){
        now = 0
      }else{
        now++
      }
      $ullis.eq(now).addClass('show').siblings().removeClass('show')
      $ollis.eq(now).addClass('active').siblings().removeClass('active')
    },2000)
  }
  return initBanner
})