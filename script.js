const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

       
var t1 = gsap.timeline();


function loading() {
    var progress = document.querySelector('#progress');
    // var progressbar = document.querySelector('#progress-bar');
    var percent = document.querySelector('#percent');
    var count = 5;

    var load = setInterval(animate,50);
    function animate () {
        if(count == 100) clearInterval(load);
        else {
            count = count + 5;
            progress.style.width = `${count}%` ;
            percent.textContent = `${count}%` ;
        }
    }
    var loadingpage = document.querySelector('#loadingpage');

    t1.to( (loadingpage) , {
        top:'-100%',
        duration:1,
        delay:1,
    })


}

function menu() {
    var menu = document.querySelector('#nav #menu>h4');
    menu.addEventListener('click',function() {
        gsap.to(('#nav #menu #items h4'),{
            marginTop:0,
            stagger:0.2,
            opacity:1,
        })
        
    })
}

var timeout =0 ;

function circlechaptalaro(){

    var xscale = 1;   
    var yscale = 1;   

    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove',function(dets){
        clearTimeout(timeout);

        var xdiff = Math.abs(dets.clientX - xprev);
        var ydiff = Math.abs(dets.clientY - yprev);

        xscale = gsap.utils.clamp(.7,1.1,xdiff);
        yscale = gsap.utils.clamp(.7 ,1.1,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemousefollower(xscale,yscale);

        timeout = setTimeout(function (){
            document.querySelector('#minicircle').style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);

    });
}


function firstpageanim() {
    // var t1 = gsap.timeline();

   

    t1.from('#nav', {
        y:'-10',
        duration:1.5,
        opacity:0,
        ease:Expo.easeInOut,
    })
    .to('.boundingelem', {
        y:'0',
        duration:1.5,
        // opacity:.6,
        delay:-1,
        ease:Expo.easeInOut,
        stagger:.2,
    })
    .from('#herofooter', {
        duration:1.5,
        delay:-1,
        opacity:0,
        ease:Expo.easeInOut,
    })
}

function circlemousefollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform =`translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;

    })
}


loading();
menu();
circlechaptalaro();
circlemousefollower();
firstpageanim();

var circle = document.querySelector('#minicircle')

document.querySelectorAll(".elem").forEach(function(elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener('mousemove',function (dets) {

        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector('img'),{
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot*0.5)
        });

        gsap.to(elem.querySelector('h1'),{
            opacity:.3,
            ease:Power3,
            x:32,

        });

        elem.querySelector('h5').style.opacity = '.3';

        
        circle.innerHTML = 'view';
        circle.style.width = '70px';
        circle.style.height = '70px';
        circle.style.mixBlendMode = 'normal';
        
    });
    elem.addEventListener('mouseleave',function (dets) {
        
        gsap.to(elem.querySelector('img'),{
            opacity:0,
            ease:Power1,
        });
        gsap.to(elem.querySelector('h1'),{
            opacity:.7,
            ease:Power3,
            x:0,

        });

        elem.querySelector('h5').style.opacity = '1';

        circle.innerHTML = '';
        circle.style.width = '13px';
        circle.style.height = '13px';
        circle.style.mixBlendMode = 'difference';
        
    });
});