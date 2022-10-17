"use strict";

(() => {
  let yOffset = 0; //pageYOffset 대신 쓸 전역 변수 선언
  let prevScollHeight = 0; //현재 스크롤된 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; //새로운 씬이 시작된 순간 true로


  const sceneInfo = [
    {
      /* scroll section 0 */
      type: 'sticky',
      heightNum: 5,
      //스크롤 애니메이션을 위한 document 전체 스크롤 높이를 지정, 
      //0인 이유는 브라우저 스크린 높이의 heightNum배수로 잡아야 하기 때문에 일단 0으로 지정
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
        messageB_opacity_in: [0, 1, {start: 0.3, end: 0.4}],
        messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}],
        messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
        messageA_translateY_out: [0, -20, {start: 0.25, end: 0.3}],
      }
    },
    {
      /* scroll section 1 */
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      /* scroll section 2 */
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      /* scroll section 3 */
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  function setLayout() {
    //section별 scoll height 잡아주기
    for(let i= 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[0].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    //새로고침시 스크롤이 위치하고있는 섹션 보여주기
    yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for (let i = 0; i < sceneInfo.length; i++) {
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if (totalScrollHeight >= yOffset) {
				currentScene = i;
				break;
			}
		}
    document.body.setAttribute('id', `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    //현재 씬에서부터 스크롤 된 비율 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    
    if (values.length === 3){ 
      //시작~끝 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollStart) {
        rv = values[1];
      }

    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }

  function playAnimation(){
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight
    const scrollRatio = (yOffset - prevScollHeight) / scrollHeight 

    switch(currentScene) {
      case 0:
        //console.log('0 play');
        const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
        const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
        const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
        const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);

        if(scrollRatio <= 0.22) {
          //in
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else {
          //out
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        }

        console.log(messageA_opacity_in);
        break;

      case 1:
        //console.log('1 play');
        break;

      case 2:
        //console.log('2 play');
        break;

      case 3:
        //console.log('3 play');
        break;
    }
  }
  
  function scrollLoop(){
    enterNewScene = false;
    prevScollHeight = 0;
    for(let i = 0; i < currentScene; i++) {
      prevScollHeight += sceneInfo[i].scrollHeight;
    }

    if(yOffset > prevScollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if(yOffset < prevScollHeight) {
      enterNewScene = true;
      if(currentScene === 0) {return;}//브라우저 바운스 효과로 currentScene이 -1이 되는 것을 방지
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if(enterNewScene) return;
    playAnimation();
  }






  window.addEventListener('scroll', () => {
    //윈도우가 스크롤 된 값을 yOffset 변수에 담음
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  /* window.addEventListener('DOMContentLoaded', setLayout); */ //document 로드 완료 시 로드
  
  //리소스 모드 로드 되면~
  window.addEventListener('load', setLayout);
  //윈도우 리사이즈 이벤틉 발생 시, 높이값 변경되도록.
  window.addEventListener('resize', setLayout);


  //setLayout 함수 호출
  setLayout();
})();