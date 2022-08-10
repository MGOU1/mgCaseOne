requirejs.config({
    paths: {
      'jquery': '/lib/jquery-3.4.1.min'
    }
  });


define(['jquery' , '/js/modules/cartStorage.js'] , function($ , {setCartStorage,getCartStorage}){

    
    let $cart_list = $('.cart_list');
    let $cart_title_selectAll = $('.cart_title_selectAll')
    let $cart_computed_all = $('.cart_computed_all')//总计
    let $cart_computed_num = $('.cart_computed_num')//商品


    initCart()
    bindCart()

    // 加载页面
    function initCart(){
        let cartList = getCartStorage();
        
        let html = cartList.map((v) => {
            return `
                <li>
                    <div><input type="checkbox" ${v.ischecked? 'checked' : ''} class="cart_list_cb"></div>
                    <div>${v.goodsName} ( ${v.goodsType} )</div>
                    <div>¥ ${v.goodsPrice}.00</div>
                    <div>
                        <span class="cart_list_remove">-</span>
                        <input class="cart_list_text" type="text" value="${v.goodsNumber}">
                        <span class="cart_list_add">+</span>
                    </div>
                    <div>¥ ${v.goodsPrice * v.goodsNumber}.00</div>
                    <div class="cart_list_del">删除</div>
                </li>
            `;
        }).join('');
        $cart_list.html(html)
        // 所有产品都选中 全选按钮亮起
        let allCheck = cartList.every(v => v.ischecked)
        $cart_title_selectAll.prop('checked' , allCheck)

        // 底部的结算总计与选择的商品
        let tmpNum = 0;
        let tmpAll = 0;
        cartList.forEach(v => {
            if(v.ischecked){
                tmpNum += v.goodsNumber;
                tmpAll += v.goodsNumber * v.goodsPrice;
            }
        })
        $cart_computed_all.html(tmpAll);
        $cart_computed_num.html(tmpNum);
    }
// 实现页面功能
    function bindCart(){
        let cartList = getCartStorage();

        // 增加数量点击
        $cart_list.on('click' , '.cart_list_add' , function(){
            let index = $(this).closest('li').index()
            cartList[index].goodsNumber++
            setCartStorage(cartList)
            initCart()
        })
        // 数量减少点击
        $cart_list.on('click' , '.cart_list_remove' , function(){
            let index = $(this).closest('li').index()
            if(cartList[index].goodsNumber > 1){
                cartList[index].goodsNumber--
                setCartStorage(cartList)
                initCart()
            }
        })

        // 自主输入数量
        $cart_list.on('input' , '.cart_list_text' , function(){
            let index = $(this).closest('li').index()
            if(isNaN(this.value)){
                this.value = cartList[index].goodsNumber;
            }else{
                cartList[index].goodsNumber = this.value;
                setCartStorage(cartList)
                initCart()
            }
        })
        // 删除按钮
        $cart_list.on('click' , '.cart_list_del' , function(){
            let index = $(this).closest('li').index()
            cartList.splice(index,1)
            setCartStorage(cartList)
            initCart()
        })

        // 选择当前产品 
        $cart_list.on('click' , '.cart_list_cb' , function(){
            let index = $(this).closest('li').index()
            cartList[index].ischecked = this.checked
            setCartStorage(cartList)
            initCart()

            
        })
        //全选
        $cart_title_selectAll.on('click', function(){
            cartList.forEach(v => {
                v.ischecked = this.checked;
            });
            setCartStorage(cartList)
            initCart()
        })

        
    }

})