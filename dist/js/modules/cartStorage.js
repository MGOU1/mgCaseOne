define(['jquery'] , function($){

    let key = 'cartList'

    function addCartStorage(ret){
        console.log(ret)
        let cartList = getCartStorage()
        let flag = true;
        let index = -1;
        cartList.forEach((v,i) => {
            if(ret.goodsName === v.goodsName && ret.goodsType === v.goodsType){
                flag = false;
                index = i;
            }
        })
        if(flag){
            cartList.unshift(ret)
        }else{
            cartList[index].goodsNumber += ret.goodsNumber;
        }
        setCartStorage(cartList)
        alert('添加成功')
    }

    function setCartStorage(cartList){
        localStorage.setItem(key,JSON.stringify(cartList));
    }

    function getCartStorage(){
        return JSON.parse(localStorage.getItem(key) || '[]');
    }


    return {
        addCartStorage,
        setCartStorage,
        getCartStorage
    }
})