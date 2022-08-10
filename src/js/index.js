requirejs.config({
    paths:{
        'jquery' : '/lib/jquery-3.4.1.min'
    }
})

define(['jquery' , '/js/modules/banner.js' , '/api/server.js'] , function($ ,initBanner, {getIndexBanner,getGoodsData}){
    getIndexBanner().then((data) => {
        initBanner(data)
    })
    
    getGoodsData('phone').then((data) => {
        initGoods( 'phone',data)
    })
    getGoodsData('pad').then((data) => {
        initGoods('pad',data)
    })
    getGoodsData('book').then((data) => {
        initGoods('book',data)
    })
    function initGoods(id,data){
        console.log(data)
        let html = `
        <h2 class="goods_title">${data.title}</h2>
        <ul class="goods_list clearfix">
          ${data.goods_list.map((v) => {
            return `
                <li>
                    <a href="/views/detail.html?type=${data.type}&goodsId=${v.goodsId}">
                    <div><img src="${v.goodsImg}" alt=""></div>
                    <h3>${v.goodsName}</h3>
                    <p>¥${v.goodsPrice}</p>
                    </a>
                </li>
            `
          }).join('')}
        </ul>
        `;
        $('#' + id).html(html)
    }
});