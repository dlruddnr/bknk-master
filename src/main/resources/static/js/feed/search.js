const feedContainerElem=document.querySelector('#feedContainer');
const pagingContainerElem=document.querySelector('#pagingContainer')
const searchDataElem=document.querySelector('#searchData')

const feedListObj={
    searchType:0,
    searchWord:'',
    limit:9,
    page:1,
    url:'',
    makeFeedList: function(){
        feedContainerElem.innerHTML=''
            // `<div id="container1"></div>
            //                          <div id="container2"></div>
            //                          <div id="container3"></div>`
        fetch(`${feedListObj.url}?limit=${feedListObj.limit}&searchType=${feedListObj.searchType}&searchWord=${feedListObj.searchWord}&page=${feedListObj.page}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson)

                for(var i=0; i<myJson.length;i++){
                    var item=myJson[i]
                    var container;
                    // if(i<3){
                    //     container=feedContainerElem.firstChild
                    // }else if(i<6){
                    //     container=feedContainerElem.children[1]
                    // }else{
                    //     container=feedContainerElem.lastChild
                    // }

                    const DIV=document.createElement('div')
                    const ATAG=document.createElement('a')
                    const SPANTAG=document.createElement('span')
                    const IMGTAG=document.createElement('img')
                    const IMGTAG2=document.createElement('img')
                    const TITLE=document.createElement('div')
                    const FAV=document.createElement('div')
                    const ITAG=document.createElement('i')

                    IMGTAG.src=`/pic/post/${item.iboard}/${item.img_addr}`
                    IMGTAG.onerror=function(){this.src='/img/spring.jpg'}

                    TITLE.innerText=item.title
                    TITLE.classList='title'

                    FAV.classList='favDiv'
                    console.log(item.mainProfile)
                    FAV.innerHTML=`<a href="/${item.writer}/">
                                    <img class="wh30 profile" src="/pic/user/${item.iuser}/${item.mainProfile}" onerror="this.src='/img/profile.png'">
                                    <div>${item.writer}</div>
                                    </a>`
                    FAV.append(ITAG)
                    // FAV.append(item.cntFav)


                    SPANTAG.append(IMGTAG)
                    SPANTAG.append(TITLE)

                    ATAG.append(SPANTAG)
                    ATAG.href=`/b/reg?iboard=${item.iboard}`

                    // container.append(ATAG)
                    DIV.append(FAV)
                    DIV.append(ATAG)

                    feedContainerElem.append(DIV)
                    feedListObj.chkFav(item.iboard, ITAG)
                }

            })
    },
    getFeedPage : function (){
        fetch(`/b/searchPage?searchType=${feedListObj.searchType}&searchWord=${feedListObj.searchWord}&limit=${feedListObj.limit}&page=${feedListObj.page}`)
            .then(res => res.json())
            .then(myJson => {

                for(var i=1; i<=myJson;i++){
                    const ATAG=document.createElement('a')
                    ATAG.innerText=i
                    ATAG.addEventListener('click',function(e){
                        feedListObj.page=e.target.innerText
                        console.log(feedListObj.page)
                        console.log(feedListObj.url)
                        feedListObj.makeFeedList()
                    })
                    pagingContainerElem.append(ATAG)
                }
            })
    },
    chkFav : function (iboard,i){
        fetch(`/b/chFav?iboard=${iboard}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson)
                switch(myJson){
                    case 0:
                        i.classList=`far fa-heart pointer`
                        i.dataset.iboard=iboard
                        i.addEventListener('click',feedListObj.insFav)
                        break
                    case 1:
                        i.classList='fas fa-heart pointer'
                        i.dataset.iboard=iboard
                        i.addEventListener('click',feedListObj.delFav)
                        break
                }
            })
    },
    insFav : function (e){
        iboard=e.target.dataset.iboard
        i=e.target
        console.log('insFAV')
        fetch('/b/insFav',{
            method:'POST',
            headers:{'Content-Type':'application/json; charset=utf-8'},
            body:JSON.stringify({iboard:iboard})
        }).then(res => res.json())
            .then(myJson => {
                if(myJson==1){
                    i.classList='fas fa-heart pointer'
                    // i.dataset.favcount=parseInt((iconFavElem.dataset.favcount))+1
                    // i.innerText=iconFavElem.dataset.favcount
                    i.removeEventListener('click',feedListObj.insFav)
                    i.addEventListener('click',feedListObj.delFav)
                }
            })
    },

    delFav : function (e){
        iboard=e.target.dataset.iboard
        i=e.target
        console.log('delFAV')
        fetch('/b/delFav',{
            method:'POST',
            headers:{'Content-Type':'application/json; charset=utf-8'},
            body:JSON.stringify({iboard:iboard})
        }).then(res => res.json())
            .then(myJson => {
                if(myJson==1){
                    i.classList='far fa-heart pointer'
                    // i.dataset.favcount=parseInt((iconFavElem.dataset.favcount))-1
                    // i.innerText=iconFavElem.dataset.favcount
                    i.removeEventListener('click',feedListObj.delFav)
                    i.addEventListener('click',feedListObj.insFav)
                }
            })
    }
}


feedListObj.url=`/b/feedlist`
feedListObj.searchType=searchDataElem.dataset.searchType
feedListObj.searchWord=searchDataElem.dataset.searchWord
feedListObj.getFeedPage()
feedListObj.makeFeedList()



