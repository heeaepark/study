(function() {
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const selectCharElem = document.querySelector('.select-character');
    const mousePos = {x: 0, y: 0};
    let maxScrollValue = 0;


    function resizeHandler(){
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function() {
        const scrollPer = this.pageYOffset / maxScrollValue;
        //wall move
        const zMove = scrollPer * 980 - 490;
        /* console.log(pageYOffset / maxScrollValue) */
        houseElem.style.transform = `translateZ(${zMove}vw)`;

        //progress bar
        barElem.style.width = `${scrollPer * 100}%`;
    });

    window.addEventListener('resize', resizeHandler);

    window.addEventListener('mousemove', function(e) {
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
    });

    stageElem.addEventListener('click', function(e) {
        /* console.log(e.clientX / window.innerWidth * 100) */ //클릭한 x좌표를 퍼센트로 연산한 값
        new Charactor({
            xPos: e.clientX / window.innerWidth * 100,
            speed: Math.random() + 0.2,
        });// 캐릭터 생성자 호출
    });

    selectCharElem.addEventListener('click', function(e) {
        const value = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', value);
    });
    resizeHandler(); //브라우저 로드시 바로 실행 되도록

})();