var Tour = {
    id:"knab_poc_tour",
    self:this,
    steps:[
        {
            target:"#brand",
            placement:"bottom",
            title:"This is our Brand!",
            content:"Please take a good look at our brand. It is really unique and appealing.",

        },
        {
            target:"#nav",
            placement:"bottom",
            title:"This is navigation menu",
            content:"Quite functional isn't it? Choose between 'Home', 'About', 'Contact'. "

        },
        {
            target:"#tut_progressbar",
            placement:"right",
            title:"Cool Progresbar!",
            content:"This is the progresbar which will show you....Well progres...:)"

        },
        {
            target:"#accordion",
            placement:"right",
            title:"Long Accordion",
            content:"This is accordion. When you clikc on it, it would collapse and show you a number of options belonging to category in the head."
        },
        {
            target:"#tour_button",
            placement:"right",
            title:"The End.",
            content:"This concludes our tour. If you want to continue the tour please click this button again. Bye now! :)"
        }

    ]
}


function startTutorial(){
    var tutBuble;

    hopscotch.listen("show",function(ev){
        var target = $(hopscotch.getCurrTarget()).attr("id");
        tutBuble = new TutorialBubble("#"+target);
    });

    hopscotch.listen("start",function(ev){
        var target = $(hopscotch.getCurrTarget()).attr("id");
        tutBuble = new TutorialBubble("#"+target);
    });

    hopscotch.listen("end",function(ev){
        tutBuble.hideOverlay();
    });
    hopscotch.startTour(Tour);
}


$(".btn").on("click",function(ev){
    ev.preventDefault();
    startTutorial();
})




var TutorialBubble = function(tutorialItem){
    var self = this;
    this.tutorialItem = tutorialItem;
    this.borderWidth=3;
    this.overlayElementsSizes = {}
    this.el = $(tutorialItem);
    this.$overlay = $(".overlay");

    this.init = function(){
        this.hideOverlay();
        this.findElement();
        this.showOverlay();

    }

    this.showOverlay = function(){
        $(".overlay").show();
    }

    this.hideOverlay = function(){
        var $dimmed = $(".overlay .dimmed");
        if($dimmed){
            $dimmed.remove();
        }
        $(".overlay").hide();
    }

    this.appendOverLayElements = function(elementSizes){
           //the top element
           var fragment = document.createDocumentFragment();

           var dimmedTop = document.createElement("div");
           dimmedTop.setAttribute('class','dimmed top');
           $(dimmedTop).css({
               width:'100%',
               height:elementSizes.marginTop,
               top:0
           });

           $(fragment).append(dimmedTop);

           //left element
           var dimmedLeft = document.createElement('div');
           dimmedLeft.setAttribute('class','dimmed left');
            $(dimmedLeft).css({
                width:elementSizes.marginLeft+this.borderWidth,
                marginTop:elementSizes.marginTop,
                height:window.innerHeight-elementSizes.marginTop
            });

            $(fragment).append(dimmedLeft);

            //right element
            var dimmedRigth = document.createElement('div');
            dimmedRigth.setAttribute('class','dimmed right');
            $(dimmedRigth).css({
                marginLeft:elementSizes.marginLeft+elementSizes.width-this.borderWidth,
                height:elementSizes.height,
                width:window.innerWidth-(elementSizes.marginLeft+elementSizes.width)+this.borderWidth,
                marginTop:elementSizes.marginTop
            });
            $(fragment).append(dimmedRigth)

            //bottom element
            var dimmedBottom = document.createElement('div');
            dimmedBottom.setAttribute('class','dimmed bottom');
            $(dimmedBottom).css({
                marginLeft:elementSizes.marginLeft+this.borderWidth,
                height:window.innerWidth-elementSizes.height-elementSizes.marginTop,
                width:window.innerWidth,
                marginTop:elementSizes.marginTop+elementSizes.height
            });
            $(fragment).append(dimmedBottom);

            
            this.$overlay.append(fragment);
    }

    this.getCssValue = function(value){
        var cssVal = this.el.css(value);
        if(cssVal !== undefined){
          cssVal = cssVal.substring(0,cssVal.length-2);
          return parseInt(cssVal);
        }
    }

    this.cloneElement = function(){
       var $element = this.el;

       var html = $element[0].innerHTML;
       this.getCssValue('padding-left');
       $("body").append("<div id='border'></div>");
       var $borderedElement = $("#border");
       elementSizes = {
           marginTop :$element.offset().top-$(window).scrollTop(),
           marginLeft:$element.offset().left,
           width:$element.width()+this.borderWidth+this.getCssValue('padding-left')+this.getCssValue('padding-right'),
           height:$element.height()+this.borderWidth+this.getCssValue('padding-top')+this.getCssValue('padding-bottom')
       }

        $borderedElement.css({
           marginTop:elementSizes.marginTop,
           marginLeft:elementSizes.marginLeft,
           width:elementSizes.width,
           height:elementSizes.height,
           position:"absolute",
           borderRadius: "5px",
           border:"solid 3px red",
           opacity:"1",
           zIndex:"100000 !important",
           transition:"1s"
       });

      this.$overlay.append($borderedElement);
      this.appendOverLayElements(elementSizes);
    }

    this.findElement = function(){

       self.cloneElement(this.el);
    }

    this.init();
}