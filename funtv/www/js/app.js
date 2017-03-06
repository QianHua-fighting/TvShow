var app = angular.module("starter" , ["ionic",'controllers']);
app.config(function ($stateProvider , $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  //配置默认情况显示的界面
  $urlRouterProvider.otherwise("/tab/shouye");


  //配置其他界面的路由状态
  $stateProvider.state("tab", {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  });

  $stateProvider.state("tab.shouye", {
    url: "/shouye",
    views: {
      "shouye": {
        templateUrl: "templates/shouye.html",
        controller: "shouyeC"
      }
    }
  });



  $stateProvider.state("tab.wode", {
    url: "/wode",
    views: {
      "wode": {
        templateUrl: "templates/wode.html",
        controller: "wodeC"
      }
    }
  });
  $stateProvider.state("tab.shipin", {
    url: "/shipin",
    views: {
      "shipin": {
        templateUrl: "templates/shipin.html",
        controller: "shipinC"
      }
    }
  });
  $stateProvider.state("tab.detail", {
    url: "/detail",
    views: {//视图模板
      "shouye": {
        templateUrl: "templates/detail.html",
        controller: "detailC"
      }
    },
    params: {//参数模板
      sid: ""
    }
  });
  $stateProvider.state("tab.baguadetail", {
    url: "/baguadetail",
    views: {//视图模板
      "shouye": {
        templateUrl: "templates/baguadetail.html",
        controller: "baguaC"
      }
    },
    params: {//参数模板
      url: "",


    }
  });
  $stateProvider.state("tab.starbang", {
    url: "/starbang",
    views: {//视图模板
      "shouye": {
        templateUrl: "templates/starbang.html",
        controller: "starbangC"
      }
    }

  });
  //hot讨论区
  $stateProvider.state("tab.hots" , {
    url:"/hots",
    views:{
      "faxian":{
        templateUrl:"templates/hots.html",
        controller:"hotsC"
      }
    },
    params:{
      sid:"",
      title:"",
      thumb:""

    }
  });
  //hot讨论区
  $stateProvider.state("tab.hotsV" , {
    url:"/hotsV",
    views:{
      "faxian":{
        templateUrl:"templates/hotsV.html",
        controller:"hotsVC"
      }
    },
    params:{
      videosList:"",
      index:""
    }
  });
  //作品视频
  $stateProvider.state("tab.article" , {
    url:"/article",
    views:{
      "faxian":{
        templateUrl:"templates/article.html",
        controller:"articleC"
      }
    },
    params:{
      videosList:"",
      index:""
    }
  });

  //发现 头部
  $stateProvider.state("tab.head" , {
    url:"/head",
    views:{
      "faxian":{
        templateUrl:"templates/head.html",
        controller:"headC"
      }
    },
    params:{
      list:"",
      index:"",
      cid:""
    }
  });
  //发现头部视频播放
  $stateProvider.state("tab.headVideo" , {
    url:"/headVideo",
    views:{
      "faxian":{
        templateUrl:"templates/headVideo.html",
        controller:"headVideoC"
      }
    },
    params:{
      list:"",
      index:""
    }
  });
  //我的讨论区
  $stateProvider.state("tab.myTalk" , {
    url:"/myTalk",
    views:{
      "faxian":{
        templateUrl:"templates/myTalk.html",
        controller:"myTalkC"
      }
    },
    params:{
      list:"",
      index:""
    }
  });
  //视频单独播放
  $stateProvider.state("tab.openvideo" , {
    url:"/openvideo",
    views:{
      "shipin":{
        templateUrl:"templates/openvideo.html",
        controller:"openvideoC"
      }
    },
    params:{
      list:"",
      index:""
    }
  });
  $stateProvider.state("tab.faxian" , {
    url:"/faxian",
    views:{
      "faxian":{
        templateUrl:"templates/faxian.html",
        controller:"faxianC"
      }
    }
  });
})
app.value("MyValue",{
  dataList:{
    videosList:"",
    index:""
  },
  articleList:{
    videosList:"",
    index:""
  },
  starList:{
    stars:"",
    starsArr:[],
    sid:"",
    thumb:"",
    title:"",
    isDenglu:''
  },
  faxian:{
    title:"",
    thumb:"",
    sid:""
  },
  moreVideos:{
    index:"",
    list:"",
    cid:"",
    name:""
  }
})

