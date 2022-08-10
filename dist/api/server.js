define(['jquery'] , function($){

    function getIndexBanner(){
        return $.ajax('/api/mock/banner.json')
    }

    function getDetailBanner(){
        return $.ajax('/api/mock/banner2.json')
    }
    function getGoodsData(type){
        return $.ajax(`/api/mock/${type}.json`)
    }
    function getDetailData(type , id){
        
        return $.ajax(`/api/mock/${type}.json`).then((data) => {
            return data.goods_list.find((v) => {
                return id === v.goodsId;
            })
        })
    }
    return {
        getIndexBanner,
        getDetailBanner,
        getGoodsData,
        getDetailData
    }
})