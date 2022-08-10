requirejs.config({
    paths:{
        'jquery' : '/lib/jquery-3.4.1.min'
    }
})

define(['jquery' ,'/js/modules/banner.js', '/js/modules/cartStorage.js' ,'/api/server.js' ] , function($ , initBanner ,{addCartStorage}, {getDetailBanner,getDetailData}){
    getDetailBanner().then((data) => {
        initBanner(data)
    })

    let type = location.search.match(/type=([^&]+)/)[1];
    let id = location.search.match(/goodsId=([^&]+)/)[1];
    getDetailData(type,id).then((data) => {
        initGoods(data)
        bindGallery()
        bindMessage(data)
    })

//  渲染页面
    function initGoods(data){
        // console.log(data)
        // detail_gallery
        let $detail_gallery = $('.detail_gallery')
        let htmlGallery = `
        <div class="detail_gallery_normal">
            <img src="${data.photoNormal}" alt="">
            <span></span>
        </div>
        <div class="detail_gallery_large">
            <img src="${data.photoLarge}" alt="">
        </div>
        `;
        $detail_gallery.html(htmlGallery)

        let $detail_message = $('.detail_message')

        let htmlMessage = `
        <h2>${data.goodsName}</h2>
        <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}.00</span></p>
        <p>选择颜色${data.chooseColor.map((v , i) => `<span class="detail_message_box ${i === 0? 'active' : ''}">${v}</span>`).join('')}</p>
        <div class="detail_message_btn clearfix">
            <div class="detail_message_num l">
                <input class="detail_message_number" type="text" value="1">
                <span class="detail_message_add">+</span>
                <span class="detail_message_remove">-</span>
            </div>
            <div class="detail_message_cart l"><a href="javascript:">加入购物车</a></div>
            <div class="detail_message_computed l"><a href="/views/cart.html">立即下单</a></div>
        </div>
        `;
        $detail_message.html(htmlMessage)
    }

//  放大镜功能
    function bindGallery(){
        let $detail_gallery_normal = $('.detail_gallery_normal');
        let $span = $('.detail_gallery_normal span');
        let $detail_gallery_large = $('.detail_gallery_large')
        let $img = $('.detail_gallery_large img')
        $detail_gallery_normal.hover(function(){
            $span.toggle()
            $detail_gallery_large.toggle()
        } , function(){
            $span.toggle()
            $detail_gallery_large.toggle()
        })
        $detail_gallery_normal.on('mousemove' , function(ev){
            let L = ev.pageX - $detail_gallery_normal.offset().left - $span.outerWidth()/2;
            let T = ev.pageY - $detail_gallery_normal.offset().top - $span.height()/2;

            if(L <= 0){
                L = 0
            }else if(L >= $detail_gallery_normal.outerWidth() - $span.outerWidth()){
                L = $detail_gallery_normal.outerWidth() - $span.outerWidth()
            }

            if(T <= 0){
                T = 0
            }else if(T >= $detail_gallery_normal.outerHeight() - $span.outerHeight()){
                T = $detail_gallery_normal.outerHeight() - $span.outerHeight()
            }

            $span.css({
                left : L,
                top : T
            })

            let scaleX = L / ($detail_gallery_normal.outerWidth() - $span.outerWidth());
            let scaleY = T / ($detail_gallery_normal.outerHeight() - $span.outerHeight());

            $img.css({
                left: -scaleX * ($img.outerWidth() - $detail_gallery_large.outerWidth()),
                top: -scaleY * ($img.outerHeight() - $detail_gallery_large.outerHeight()),
            })
            
            
        })

    }

//  完成右侧菜单功能
    function bindMessage(data){
        let $detail_message_box = $('.detail_message_box');
        let $detail_message_add = $('.detail_message_add');//+
        let $detail_message_remove = $('.detail_message_remove');//-
        let $detail_message_number = $('.detail_message_number');//input
        let $detail_message_cart = $('.detail_message_cart');


        $detail_message_box.click(function(){
            $(this).addClass('active').siblings().removeClass('active')
        })
        $detail_message_add.click(function(){
            let value = $detail_message_number.val()
            value++
            $detail_message_number.val(value)
        })
        $detail_message_remove.click(function(){
            let value = $detail_message_number.val();
            value == 1? value: value--;
            $detail_message_number.val(value)
        })
        $detail_message_number.on('input' , function(){
            let value = $(this).val()
            if(isNaN(value)){
                $(this).val(1)
            }
        })

        $detail_message_cart.click(function(){
            // console.log(data)
            // console.log($detail_message_number.val())
            let ret = {
                goodsName: data.goodsName,
                goodsType: $('.detail_message_box.active').html(),
                goodsPrice: data.goodsPrice,
                goodsNumber: Number($detail_message_number.val()),
                ischecked: false
            }
            addCartStorage(ret)
        })
    }

})