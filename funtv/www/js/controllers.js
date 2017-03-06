angular.module('controllers', ['ngCordova'])
  .controller('shouyeC', function($scope,$http,$state,$ionicSlideBoxDelegate,MyValue) {

    document.addEventListener("deviceready", function () {
      console.log("设备准备好了");
      // alert("kaishi");
      $scope.db = window.sqlitePlugin.openDatabase({name:"my.db"});
      console.log($scope.db);

      setTimeout(function () {
        console.log("进入定时器");
        $scope.db.transaction(function (tx) {
          tx.executeSql("create table xiazai_table (isfirst boolean)" , function (tx , res) {
            console.log("成功");
            console.log(res);

          } , function (tx , error) {

            console.log("错误");
            console.log(error);
          });
        } , 4000);
      });

    }, false);

    $scope.insertFn = function () {
      $scope.db.transaction(function (tx) {
        tx.executeSql("INSERT INTO xiazai_table (isfirst) VALUES (?)", [true], function(tx, res) {
          console.log(res);
        } , function (tx , error) {
          console.log("插入错误");
            console.log( error);
        });
      });
    }


    $scope.selectFn = function () {
      $scope.db.transaction(function (tx) {
        tx.executeSql("select * from xiazai_table;", [], function(tx, res) {
          console.log(res);
          console.log(res.rows.item(0));
        } , function (tx , error) {
          console.log("查询错误:" + error);
        });
      });
    }

    $scope.mine={
      itemClick:function (index) {
        // 要想使用路由,
        // 1配置路由(tab.detail)
        // 2构建路由界面(templateUrl:tempaltes/detail.html)
        // 3完成跳转(触发路由的配置)(ui-sref="tab.detail)(go("tab.detail)
        // 根据下表获取数据
        //
        // 拿到数据,跳转到详情页面


        $state.go("tab.detail",{
          sid: $scope.mine.hothan.items[index].sid
        });

      },
      bangClick:function () {
        $state.go("tab.starbang");


      },
      starbangClick:function (index) {
        // $state.go("tab.hots" , {
        //   sid:$scope.mine.starsArr[index].sid,
        //   thumb:$scope.mine.starsArr[index].thumb,
        //   title:$scope.mine.starsArr[index].name
        // });
        $state.go("tab.hots");
        MyValue.faxian.sid = $scope.mine.starsArr[index].sid;
        MyValue.faxian.thumb = $scope.mine.starsArr[index].thumb;
        MyValue.faxian.title = $scope.mine.starsArr[index].name;
      },

    baguaiClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotbaiguai.items[index].sources
        });
      },
      starClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotstar.items[index].sources
        });
      },
      hotxingzuoClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotxingzuo.items[index].sources
        });
      },
      hotjianshenClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotjianshen.items[index].sources
        });
      },
      hotliuyouClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotliuyou.items[index].sources
        });
      },
      hotmeizuoClick:function (index) {
        $state.go("tab.baguadetail",{
          url: $scope.mine.hotmeizhuang.items[index].sources
        });
      },
      moreFn:function () {

        $state.go("tab.head");
        MyValue.moreVideos.cid = $scope.mine.hotmeizhuang.cid;
        MyValue.moreVideos.name = $scope.mine.hotmeizhuang.title;

      }

    };
    $scope.mine.starsArr = MyValue.starList.starsArr;
    console.log($scope.mine.starsArr)

    $scope.clickFn=function (index) {
      console.log(index);
      $ionicSlideBoxDelegate.slide(index);
    }
    $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/index/recommend");
    $http({
      url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method: "GET"
    }).then(function (res) {


      $scope.mine.hothan = res.data.recs[0];
      $scope.mine.hotstar = res.data.recs[1];
      $scope.mine.hotbaiguai = res.data.recs[2];
      $scope.mine.hotmeizhuang = res.data.recs[3];

      $scope.mine.hotxingzuo = res.data.recs[5];
      $scope.mine.hotjianshen = res.data.recs[6];
      $scope.mine.hotliuyou = res.data.recs[7];





    })
      .then(function (error) {

      })
    //明星板块http请求
    $scope.starurl=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?offset=0&count=30");
    $http({
      method:"GET",
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.starurl,

    }).then(function (res) {
      $scope.mine.hotstar=res.data.hotStars;
      $scope.mine.bangstar=res.data.hotStars.splice(0,7);
      console.log($scope.mine.hotstar);

    }).then(function (error) {

    });
    $scope.doRefresh = function() {
      $http({
        url: "http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
        method: "GET"
      }).then(function (res) {


        $scope.mine.hothan = res.data.recs[0];
        $scope.mine.hotstar = res.data.recs[1];
        $scope.mine.hotbaiguai = res.data.recs[2];
        $scope.mine.hotmeizhuang = res.data.recs[3];

        $scope.mine.hotxingzuo = res.data.recs[5];
        $scope.mine.hotjianshen = res.data.recs[6];
        $scope.mine.hotliuyou = res.data.recs[7];
        console.log($scope.mine.hotxingzuo);


        console.log(res.data.recs)

      })
        .then(function (error) {

        })
        .finally(function() {
          // 停止广播ion-refresher
          $scope.$broadcast('scroll.refreshComplete');
        });
    }


  })




  .controller('wodeC', function($scope,$http,MyValue) {
    //检测qq是否存在
    // $scope.QQcheckFn=function () {
    //  QQSDK.checkClientInstalled(function () {
    //    alert("qq客户端已经安装");
    //  },function () {
    //      alert("qq客户端没有安装")
    //  })
    // }
    //QQ登录
    $scope.userimg="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1487746286958&di=5bc7bbc0ad6fc1d61a24871a7e2c616d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fd50735fae6cd7b89d07599c40f2442a7d9330e5f.jpg";
    $scope.username="登录后有更多授权哦";

    MyValue.starList.isdenglu=false;
    $scope.dengluFn=function () {
      QQSDK.ssoLogin(function (res) {
             $scope.assesstoken=res.access_token;
              $scope.userid=res.userid;
        $scope.url = encodeURIComponent("https://graph.qq.com/user/get_user_info?access_token=" + $scope.assesstoken + "&oauth_consumer_key=" +  1105995390 + "&openid=" +$scope.userid+"&format=json");

        $http({
          method:"GET",
          url:"http://59.110.139.104:3000/wy?myUrl=" +$scope.url
        }).then(function (res) {
          $scope.user=res.userId;
          $scope.username=res.data.nickname;
          $scope.userimg=res.data.figureurl_2;
           $scope.istuichu=true;
          $scope.isdenglu=false;
          MyValue.starList.isDenglu=true;

        }).then(function (error) {

        })
      },function (error) {
      })

    }
    $scope.qqoutFn=function () {
      QQSDK.logout(function () {

        alert("退出登录")
        $scope.istuichu=false;
        $scope.isdenglu=true;

      }, function (failReason) {
        alert(failReason);
      });
    }







  })
  .controller('detailC',function ( $http , $state , $scope , $stateParams, $ionicSlideBoxDelegate,$ionicNavBarDelegate) {




    $scope.mine={}
          $scope.sid=$stateParams.sid;
          $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/series/detailV3?sid="+$scope.sid);
          $http({
            method:"GET",
            url:"http://59.110.139.104:3000/wy?myUrl="+$scope.url,

          }).then(function (res) {
               $scope.mine.jishu=res.data.playItems;
                $scope.mine.jiemian={
                  intro:res.data.series.intro,
                  name:res.data.series.name,
                  count:res.data.series.count,
                  source:res.data.series.source,
                  img:res.data.series.thumb
                }
            console.log($scope.mine.jiemian.name)

            var mainBar = $ionicNavBarDelegate.$getByHandle("appNavBar");
            mainBar.setTitle('<button class="button button-icon ion-chevron-left" id="btn1" style="float: left" ng-click="goBack()">'+$scope.mine.jiemian.name);

          }).then(function (error) {

          });
          $scope.tabNames=['剧集','简介'];
          $scope.slectIndex=0;
          $scope.activeSlide=function(index){//点击时候触发
            $scope.slectIndex=index;
            $ionicSlideBoxDelegate.slide(index);
          };
          $scope.slideChanged=function(index){//滑动时候触发
            $scope.slectIndex=index;
          };



    $scope.goBack=function () {

         //根据历史记录回到上一个页面
         window.history.go(-1);
       }


  })

  .controller("baguaC",function ($scope,$state,$stateParams) {
         $scope.videourl= $stateParams.url[0].page;
         var video=document.getElementById("video");
            video.src=$scope.videourl;

      $scope.goBack=function () {
      //根据历史记录回到上一个页面
      window.history.go(-1);
    }

  })
  .controller("starbangC",function ($state,$scope,$http,$ionicLoading,MyValue,$ionicPopup) {

    $scope.$on("$ionicView.enter",function () {
      $scope.guanzhustar = MyValue.starList.stars;
      console.log("--------");
      console.log($scope.guanzhustar)

      $scope.mine={
        isguanzhu:false,
        guanzhuClick:function (index,even) {

          if(MyValue.starList.isDenglu==false ){
            var alertpopup=$ionicPopup.alert({
              title:"关注失败",
              template:"请先登录再关注"
            })

          }else {
            for(var i = 0; i < $scope.mine.hotstar.length; i++){
              if(index==i){
                $scope.mine.hotstar[i].isFocus=true;
                event.target.innerText="已关注"
                event.target.style.borderColor="gray";
                MyValue.starList.stars = $scope.mine.hotstar[index];
                MyValue.starList.starsArr.push( MyValue.starList.stars)
              }
            }
          }


        },
        starClick:function (index) {

          $state.go("tab.hots");
          MyValue.faxian.sid = $scope.mine.hotstar[index].sid;
          MyValue.faxian.thumb = $scope.mine.hotstar[index].thumb;
          MyValue.faxian.title = $scope.mine.hotstar[index].title;
        }

      };


      $scope.goBack=function () {

        //根据历史记录回到上一个页面
        window.history.go(-1);
      }
      $scope.count=0;
      $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?offset="+$scope.count+"&count=30");
      $http({
        method:"GET",
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,

      }).then(function (res) {
        console.log(res.data)
        $scope.mine.hotstar=res.data.hotStars;
        for(var i = 0; i < $scope.mine.hotstar.length; i++){
          var minItem = $scope.mine.hotstar[i];

          $scope.mine.hotstar[i].textguanzhu="+ 关注";
          for (var j = 0; j < $scope.guanzhustar.length; j++){
            var focusItem = $scope.guanzhustar[j];

            if(focusItem.sid == minItem.sid){
              $scope.mine.hotstar[i].isFocus = true;

              $scope.mine.hotstar[i].textguanzhu="已 关注";



            }
          }
        }
        // console.log($scope.mine.hotstar);
        // console.log($scope.mine.bangstar)

      }).then(function (error) {

      });
    })
    $scope.loadMore=function () {

      $scope.count+=30;
      $scope.url=encodeURIComponent("http://api.hanju.koudaibaobao.com/api/star/hotStars?offset="+$scope.count+"&count=30");
      $http({
        method:"GET",
        url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,

      }).then(function (res) {


        for(var i=0;i<res.data.hotStars.length;i++){
          $scope.mine.hotstar.push(res.data.hotStars[i]);
          console.log(res.data.hotStars[i])
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');




      }).then(function (error) {

      });

    }
    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller("faxianC" , function ($scope,$http,$state,MyValue) {

    $scope.mine={

      headClick:function (index) {
        // $state.go("tab.head" , {
        //   list:$scope.mine.newArr,
        //   index:index,
        // });
        $state.go("tab.head");
        MyValue.moreVideos.list = $scope.mine.newArr;
        MyValue.moreVideos.index = index;
        MyValue.moreVideos.cid = $scope.mine.newArr[index].cid;
        MyValue.moreVideos.name = $scope.mine.newArr[index].name;
      },

      itemClick:function (index) {

        $state.go("tab.myTalk" , {
          list:$scope.mine.dataArr,
          index:index
        })


      },
      hotsClick:function (index) {

        // $state.go("tab.hots" , {
        //   sid:$scope.mine.dataHots[index].sid,
        //    thumb:$scope.mine.dataHots[index].thumb,
        //    title:$scope.mine.dataHots[index].title
        // });

        $state.go("tab.hots");
        MyValue.faxian.sid = $scope.mine.dataHots[index].sid;
        MyValue.faxian.thumb = $scope.mine.dataHots[index].thumb;
        MyValue.faxian.title = $scope.mine.dataHots[index].title;


      }
    }
    $scope.url = encodeURIComponent('http://api.hanju.koudaibaobao.com/bbs/api/forum/getBoardsV2');

    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res);
        $scope.mine.dataArr = res.data.mines;
        $scope.mine.dataHots = res.data.hots;
         console.log($scope.mine.dataHots);
      })
      .then(function (error) {
        console.log(error)
      })

    //  栅格栏请求
    $scope.tabUrl = encodeURIComponent("http://api.hanju.koudaibaobao.com/api/series/discoveryV4");
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.tabUrl,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res);
        // res.data.items.splice(0,1);
        // res.data.items.splice(9,1);

        $scope.mine.tabList = res.data.items;
        $scope.mine.newArr=$scope.mine.tabList.slice(1,8)

        console.log($scope.mine.newArr)
      })
      .then(function (error) {
        console.log(error)
      })



  })
  .controller("headC",function ($scope,$http,$stateParams,$state,$ionicNavBarDelegate,MyValue) {


    $scope.listCid =MyValue.moreVideos.cid;
    console.log($scope.listCid);

    // $scope.newCid = $stateParams.cid.cid;

    $scope.index = MyValue.moreVideos.index
    $scope.name = MyValue.moreVideos.name;
    console.log( $scope.name)
    // var mainBar = $ionicNavBarDelegate.$getByHandle("appNavBar");
    // mainBar.setTitle('<button class="button button-icon ion-chevron-left" id="btn1" style="float: left" ng-click="goBack()">'+$scope.name);

    $scope.cid =  MyValue.moreVideos.cid;
    console.log( $scope.cid)
    $scope.mine = {
      videoClick:function (index) {
        $state.go("tab.headVideo" , {
          list:$scope.mine.videoArr,
          index:index,
        });
      }
    }
    $scope.count = 10;
    $scope.offset = 1;

    $scope.url = "http://api.hanju.koudaibaobao.com/api/cate/videos?cid="+$scope.cid+"&offset="+$scope.offset+"&count="+$scope.count;
    $scope.newUrl = encodeURIComponent( $scope.url);

    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.newUrl,
      method:"GET"
    })
      .then(function (res) {
        // console.log(res);
        $scope.mine.videoArr = res.data.videos;
        // console.log($scope.mine.videoArr)


      })
      .then(function (error) {
        console.log(error)
      })


    // $scope.Nurl = "http://api.hanju.koudaibaobao.com/api/cate/videos?cid="+$scope.newCid+"&offset="+$scope.offset+"&count="+$scope.count;
    // $scope.NnewUrl = encodeURIComponent( $scope.url);
    //
    // $http({
    //   url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.NnewUrl,
    //   method:"GET"
    // })
    //   .then(function (res) {
    //     console.log(res);
    //     // $scope.mine.videoArr = res.data.videos;
    //     // console.log($scope.mine.videoArr)
    //
    //
    //   })
    //   .then(function (error) {
    //     console.log(error)
    //   })


    // 下拉触发函数
    $scope.doRefresh = function(){
      //
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.newUrl,
        metheod:"GET"
      })
        .then(function (res) {
          console.log(res);
          $scope.mine.videoArr = res.data.videos;
          $scope.$broadcast('scroll.refreshComplete');
        })
        .then(function (error) {
          if (error) {
          }
        })
    }
    //

    //  上拉触发的函数
    $scope.loadMore = function () {

      $scope.offset +=10;
      $scope.count += 10;

      $scope.url = "http://api.hanju.koudaibaobao.com/api/cate/videos?cid="+$scope.cid+"&offset="+$scope.offset+"&count="+$scope.count;
      $scope.newUrl = encodeURIComponent( $scope.url);

      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.newUrl,
        metheod:"GET"
      })
        .then(function (res) {
          console.log(res);
          for(var i = 0; i < res.data.videos.length; i++){
            $scope.mine.videoArr.push(res.data.videos[i]);
          }

          console.log($scope.mine.videoArr);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log("停止了");
        });
    };

    $scope.goBack = function () {
      // $state.go("tab.shouye");
      // 根据历史记录,回到上一个界面
      window.history.go(-1);
    }


  })
  .controller("headVideoC",function ($scope,$http,$stateParams) {

    $scope.videoUrl = $stateParams.list[$stateParams.index].sources[0].page;


    var video=document.getElementById("video");
    video.src = $scope.videoUrl;
    $scope.goBack=function () {
      //根据历史记录回到上一个页面
      window.history.go(-1);
    }
  })
  .controller("hotsC",function ($scope,$http,$stateParams,$state,$ionicSlideBoxDelegate,MyValue,$ionicNavBarDelegate) {

    // $scope.imgs = $stateParams.thumb;
    // $scope.sid = $stateParams.sid;
    // $scope.title = $stateParams.title;
    $scope.$on("$ionicView.enter" ,function () {


    $scope.imgs = MyValue.faxian.thumb;
    $scope.sid = MyValue.faxian.sid;
    $scope.title = MyValue.faxian.title;

    // var mainBar = $ionicNavBarDelegate.$getByHandle("appNavBar");
    // mainBar.setTitle('<button class="button button-icon ion-chevron-left" id="btn1" style="float: left" ng-click="goBack()">'+$scope.name);
    //

    $scope.isClick = true;
    $scope.btnClick = function () {
      if ($scope.isClick){
        console.log(btn.innerText)
        btn.innerText = "已关注";
        btn.style.backgroundColor = "hotpink";
        btn.style.color = "white";
        $scope.isClick = false;
      }else if ($scope.isClick == false){
        btn.innerText = "+ 关注";
        btn.style.backgroundColor = "";
        btn.style.color = "";
        $scope.isClick = true;
      }
    }
    $scope.mine = {
      videosClick:function (index) {
        console.log(index)

        $state.go("tab.hotsV");
        MyValue.dataList.videosList = $scope.mine.videosArr;

        MyValue.dataList.index = index;

      },

      articleClick:function (index) {

        $state.go("tab.article");
        MyValue.articleList.videosList = $scope.mine.articleLsit;
        MyValue.articleList.index = index;

      }
    };

    $scope.count = 20;
    $scope.offset = 0;

    $scope.url = "http://api.hanju.koudaibaobao.com/api/star/videos?sid="+$scope.sid+"&sort=t&offset=0&count="+$scope.count;
    $scope.allUrl = encodeURIComponent($scope.url)

    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" +  $scope.allUrl,
      method:"GET"
    })
      .then(function (res) {

        $scope.mine.videosArr = res.data.videos;
      })
      .then(function (error) {

      })

    //跳转作品集
    $scope.articleUrl = "http://api.hanju.koudaibaobao.com/api/star/works?sid="+$scope.sid+"&cate=2&offset=0&count=20";
    $scope.articleURL = encodeURIComponent($scope.articleUrl);

    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" +  $scope.articleURL,
      method:"GET"
    })
      .then(function (res) {
        console.log(res.data.works)
        $scope.mine.articleLsit = res.data.works;
      })
      .then(function (error) {

      })




    //  上拉触发的函数
    $scope.loadMore = function () {

      $scope.offset +=20;
      // $scope.count += 20;

      $scope.url = "http://api.hanju.koudaibaobao.com/api/star/videos?sid="+$scope.sid+"&sort=t&offset="+$scope.offset+"&count="+$scope.count;
      $scope.allUrl = encodeURIComponent($scope.url)
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.allUrl,
        metheod:"GET"
      })
        .then(function (res) {
          console.log(res.data.videos);
          for(var i = 0; i < res.data.videos.length; i++){
            $scope.mine.videosArr.push(res.data.videos[i]);
          }
          //
          // console.log($scope.mine.videoArr);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log("停止了");
        });
    };

    })
    //滑动

    $scope.tabNames=['最新动态','作品集'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
      $scope.slectIndex=index;
      $ionicSlideBoxDelegate.slide(index);

    };
    $scope.slideChanged=function(index){//滑动时候触发
      $scope.slectIndex=index;
    };
    $scope.pages=["templates/tab01.html","templates/tab02.html","templates/tab03.html"];


    $scope.goBack = function () {
      $state.go("tab.faxian");
      // 根据历史记录,回到上一个界面
      // window.history.go(-1);
    }

  })
  .controller("hotsVC",function ($scope,$http,$stateParams,MyValue) {

    $scope.index = MyValue.dataList.index;
    console.log(MyValue.dataList.index);
    $scope.musicUrl = MyValue.dataList.videosList[$scope.index].sources[0].page;
    console.log($scope.musicUrl);

    var video=document.getElementById("video");
    video.src = $scope.musicUrl;

    $scope.goBack=function () {

      //根据历史记录回到上一个页面
      window.history.go(-1);
    }


  })
  .controller("articleC",function ($scope,$http,$stateParams,MyValue) {
    $scope.index = MyValue.articleList.index;
    $scope.list =  MyValue.articleList.videosList;
    // console.log($scope.list)
    $scope.musicUrl = MyValue.articleList.videosList[$scope.index].sources[0].page;
     console.log($scope.musicUrl)


    var videos =document.getElementById("videos");
    videos.src = $scope.musicUrl;
    $scope.goBack=function () {

      //根据历史记录回到上一个页面
      window.history.go(-1);
    }

  })
  .controller("myTalkC",function ($scope,$http,$stateParams,$ionicNavBarDelegate) {
    $scope.headImg = $stateParams.list[$stateParams.index].thumb;
    $scope.title = $stateParams.list[$stateParams.index].title;
    $scope.bid = $stateParams.list[$stateParams.index].bid;
    console.log($stateParams.list)
    var mainBar = $ionicNavBarDelegate.$getByHandle("appNavBar");
    mainBar.setTitle('<button class="button button-icon ion-chevron-left" id="btn1" style="float: left" ng-click="goBack()">'+$scope.title);
    $scope.mine = {};
    $scope.topic =  $stateParams.list[$stateParams.index].dailyCount;

    $scope.page = 1;
    $scope.url = "http://api.hanju.koudaibaobao.com/bbs/api/forum/topicsV2?bid="+$scope.bid+"&page="+$scope.page;
    $scope.tabUrl = encodeURIComponent($scope.url);
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.tabUrl,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.dataArr = res.data.topics;
        console.log(res.data)
      })
      .then(function (error) {
        console.log(error)
      })


    //  上拉触发的函数
    $scope.loadMore = function () {

      $scope.page++;
      $scope.count += 10;

      $scope.url = "http://api.hanju.koudaibaobao.com/bbs/api/forum/topicsV2?bid="+$scope.bid+"&page="+$scope.page;
      $scope.tabUrl = encodeURIComponent($scope.url);
      $http({
        url:"http://59.110.139.104:3000/wy?myUrl="+$scope.tabUrl,
        metheod:"GET"
      })
        .then(function (res) {
          console.log(res.data.topics);
          for(var i = 0; i < res.data.topics.length; i++){
            $scope.mine.dataArr.push(res.data.topics[i]);
          }
          //
          // console.log($scope.mine.videoArr);
          $scope.$broadcast('scroll.infiniteScrollComplete');
          console.log("停止了");
        });
    };

    $scope.goBack = function () {
      // $state.go("tab.shouye");
      // 根据历史记录,回到上一个界面
      window.history.go(-1);
    }

  })
  .controller("shipinC",function ($scope,$http,$state) {
      $scope.mine = {
        VideoClick:function (index) {
          $state.go("tab.openvideo" , {
            list:$scope.mine.dataArr,
            index:index,
          });
        }
      }

    $scope.url = encodeURIComponent("http://dailyapi.ibaozou.com/api/v31/documents/videos/latest")
    $http({
      url:"http://59.110.139.104:3000/wy?myUrl=" + $scope.url,
      method:"GET"
    })
      .then(function (res) {
        $scope.mine.dataArr = res.data.data;
        console.log($scope.mine.dataArr)
      })
      .then(function (error) {
        console.log(error)
      })

    $scope.goBack=function () {

      //根据历史记录回到上一个页面
      window.history.go(-1);
    }
  })
  .controller("openvideoC",function ($scope,$http,$stateParams) {

    $scope.data = $stateParams.list;
    $scope.shareUrl = $scope.data[$stateParams.index].share_url;
    $scope.title = $scope.data[$stateParams.index].title;
    $scope.imgs = $scope.data[$stateParams.index].image;
    $scope.url = $scope.data[$stateParams.index].file_url;
    console.log($scope.url )
    var myVideo = document.getElementById("myVideo");
    myVideo.src = $scope.url;


      //qq视频分享
      $scope.shareFn = function () {

        // QQSDK.shareAudio((successCB,errorCB,params))

        var obj={};
        obj.scene=QQSDK.Scene.QQ;
        obj.url=$scope.shareUrl;
        obj.title=$scope.title;
        obj.description = "秒拍视频";
        obj.image =$scope.imgs;
        obj.flashUrl = $scope.url;


        QQSDK.shareAudio(function () {
          alert("分享视频成功")
        },function (error) {
          alert(error);
        },obj)
      }


    $scope.goBack=function () {

      //根据历史记录回到上一个页面
      window.history.go(-1);
    }


  })










