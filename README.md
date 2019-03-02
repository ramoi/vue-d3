# vue-d3
python을 공부하고, 그것을 또 익히기 위해서 웹크롤링을 도와주는 도우미 패키지를 만들었습니다.  
https://github.com/ramoi/toobuk  
그런데, 화면에서 좀 보여주면 좋을 것 같다는 생각이 들어, vuejs와 d3js를 이용해서 챠트를 그려주는 컴포넌트를 만들었는데요.  
개발자로 살아오면서 가장 힘들게 느껴지는 부분이 html인데, d3js를 컴포넌트화하려다 보니 여러가지로 힘들더군요. 원하는데로 모양이 안나오니 삽질만 했습니다.  
생각해보면, 아직 미진한 부분이 많습니다. complex라든지, y축을 오른쪽에 설정하는 것 등등  
모두 vuejs 보다는 d3에 문제되는 부분이라 공부를 하면서 그때, 그때 수정하려 합니다.  
혹시라도 실무에서 적용하시려는 분이 있다면, 사과의 말씀을 드립니다. 그 정도로 훌륭하지 않습니다.  
d3js에서 표현되어야 할 부분이 아직 허접합니다.  
다만, vuejs를 처음 접하시는 분이 계시다면 도움이 되었으면 합니다.  

src/components/d3 디렉토리에서 관련 vue 소스를 확인할 수 있습니다  
Line 챠트의 경우 line.vue 이며, 바챠트의 경우는 bar.vue, 파이챠트는 circle.vue 입니다..    
  
src/components/sample 디렉토리에서 샘플 소스를 확인할 수 있습니다.   

일단, [설치](#설치)를 하신 후, 돌아가는 화면을 보면서 소스를 보시면 편할 것 같습니다.  
전체적인 구성은 Single Page Application으로 구성되어 있습니다.  

## 차례
1. [설치 ](#설치)
	1. [버젼 정보](#1-버젼-정보)
	1. [설치](#2-설치)
1. [Line 챠트 ](#1-Line-챠트)
	1. [첫번째 형식](#11-첫번째-형식)
	1. [두번째 형식 ](#12-두번째-형식 )
1. [바챠트 ](#2-바챠트)
1. [원챠트 ](#3-원챠트)
1. [남은 이것저것](#남은-이것저것)
1. [참고 사이트 ](#참고-사이트)
	1. [메뉴 만들기 참고 사이트 ](#메뉴-만들기-참고-사이트)
	1. [챠트 ](#챠트)

## 설치 

### 1. 버젼 정보 
	vue@2.6.4
	vue-router@3.0.2
	d3@5.9.0
	axios@0.18.0
	webpack@3.12.0
	bootstrap@4.3.1

### 2. 설치 
우선 node와 vue-cli가 설치되었다는 가정하에 진행하겠습니다. 

	yarn global add @vue/cli

작업 디렉토리를 정한 후 아래 명령으로 vue를 초기화합니다.

	vue init webpack-simple chart
	cd chart
	yarn
	yarn add vue-router --dev
	yarn add d3 --dev
	yarn add axios --dev
	yarn add bootstrap --dev

chart 라는 디렉토리가 생성이 되며, 해당 디렉토리로 소스를 복사합니다.
src 디렉토리와 index.html이 chart 디렉토리로 복사되면 됩니다.

	webpack.cofig.js를 수정합니다.
		entry: './src/main.js', -> entry: './src/mainChart.js',

이제 테스트를 할 차례입니다.

	yarn run dev

## Line 챠트 
   데이타  형식이 두가지 입니다. 
   아래에서 확인 할 수 있습니다.
   
### 1.1 첫번째 형식
태그: 중요한 것은 conf 설정의 "y"값입니다. 문자열로 받고 있습니다.

		<d3-line id='p' :source='dataset' title='추이' :width=700 :height=320 :conf='{series:"year", x:"month", y:"price"}'></d3-line>

 데이타 : 아래와 같은 형식으로 넣어줍니다. 위에 conf로 바인딩한 값 중 series값이 year입니다. 
 해당 year별로 data라는 배열이 있는 객체이며 y의 속성값인 price값이 있습니다.

	   dataset = [ 
		  { year : '2017', 
			data : [{month:1, price:17}, {month:2, price:27}, {month:3, price:37}, {month:4, price:27}, {month:5, price:17}, {month:6, price:7},  {month:7, price:9}, {month:8, price:19}, {month:9, price:29}, {month:10, price:19}, {month:11, price:9}, {month:12, price:0}] 
			},
		  { year : '2018', 
			data : [{month:1, price:9}, {month:2, price:19}, {month:3, price:29}, {month:4, price:39}, {month:5, price:29}, {month:6, price:19}, {month:7, price:9}, {month:8, price:7}, {month:9, price:17}, {month:10, price:27}, {month:11, price:17}, {month:12, price:7}] 
		  }
		]
		
		
### 1.2 두번째 형식 
위와는 다르게 conf 설정의 y값이 배열입니다. 

	<d3-line id='houseProgress' :source='dataset2' title='추이' :width=700 :height=320 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["COUNTRY","CAPATIAL", "SEOUL", "SOUTH", "NORTH" ] }'></d3-line>

데이타 : 위의 데이타와는 달리 데이타베이스를 통해 얻어온 결과와 비슷합니다. y의 속성값이 배열로 이루어져 있습니다. 해당명이 또한 동시에 series명이 됩니다

	   dataset2 = [{'DATE': 201802, 'COUNTRY': 0.2, 'CAPATIAL': 0.5, 'SEOUL': 0.9, 'SOUTH': 1.2, 'NORTH': 0.7}, {'DATE': 201803, 'COUNTRY': 0.1, 'CAPATIAL': 0.3, 'SEOUL': 0.6, 'SOUTH': 0.6, 'NORTH': 0.6}, {'DATE': 201804, 'COUNTRY': 0.1, 'CAPATIAL': 0.2, 'SEOUL': 0.3, 'SOUTH': 0.3, 'NORTH': 0.3}, {'DATE': 201805, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.2, 'SOUTH': 0.2, 'NORTH': 0.3}, {'DATE': 201806, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.2, 'SOUTH': 0.1, 'NORTH': 0.4}, {'DATE': 201807, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.3, 'SOUTH': 0.3, 'NORTH': 0.4}, {'DATE': 201808, 'COUNTRY': 0.0, 'CAPATIAL': 0.2, 'SEOUL': 0.6, 'SOUTH': 0.6, 'NORTH': 0.6}, {'DATE': 201809, 'COUNTRY': 0.3, 'CAPATIAL': 0.7, 'SEOUL': 1.3, 'SOUTH': 1.5, 'NORTH': 1.0}, {'DATE': 201810, 'COUNTRY': 0.2, 'CAPATIAL': 0.4, 'SEOUL': 0.5, 'SOUTH': 0.5, 'NORTH': 0.6}, {'DATE': 201811, 'COUNTRY': 0.1, 'CAPATIAL': 0.3, 'SEOUL': 0.2, 'SOUTH': 0.1, 'NORTH': 0.3}, {'DATE': 201812, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.0, 'SOUTH': -0.1, 'NORTH': 0.2}, {'DATE': 201901, 'COUNTRY': -0.1, 'CAPATIAL': -0.1, 'SEOUL': -0.2, 'SOUTH': -0.3, 'NORTH': -0.1}] 

위 내용은 sample 디렉토리의 sample/Line.vue 에서 확인할 수 있습니다.

## 바챠트 
   바챠트는 우선, 데이타베이스 형식만 받았습니다. 아래 태그를 보면 차이를 느끼실 수 있을거예요..
   
	<d3-bar id='bar1' :source='dataset1' title='Most loved programming languages' :width=1000 :height=600 :conf='{series:"language", x:"year", y:"value"}'></d3-bar>
	<d3-bar id='bar2' :source='dataset2' title='Most loved programming languages' :width=1000 :height=600 :conf='{x:"language", y:"value"}'></d3-bar>

	dataset1 = [
	  {year:'2016', language: 'Rust', value: 78.9, },
	  {year:'2016', language: 'Kotlin', value: 75.1, },
	  {year:'2016', language: 'Python', value: 68.0, },
	  {year:'2016', language: 'TypeScript', value: 67.0, },
	  {year:'2016', language: 'Go', value: 65.6, },
	  {year:'2016', language: 'Swift', value: 65.1, },
	  {year:'2016', language: 'JavaScript', value: 61.9, },
	  {year:'2016', language: 'C#', value: 60.4, },
	  {year:'2016', language: 'F#', value: 59.6, },
	  {year:'2016', language: 'Clojure', value: 49.6, },

	  {year:'2017', language: 'Rust', value: 58.9, },
	  {year:'2017', language: 'Kotlin', value: 25.1, },
	  {year:'2017', language: 'Python', value: 78.0, },
	  {year:'2017', language: 'TypeScript', value: 47.0, },
	  {year:'2017', language: 'Go', value: 85.6, },
	  {year:'2017', language: 'Swift', value: 25.1, },
	  {year:'2017', language: 'JavaScript', value: 71.9, },
	  {year:'2017', language: 'C#', value: 40.4, },
	  {year:'2017', language: 'F#', value: 19.6, },
	  {year:'2017', language: 'Clojure', value: 12.6, }
	];

	dataset2 = dataset1.slice(10)
	
위 내용은 sample 디렉토리의 sample/Bar.vue 에서 확인할 수 있습니다.

## 원챠트 
   
	<d3-circle id='c' :source='dataset' title='통화량' :width=300 :height=300  :legend='{isShow: false}' :conf='{name:"name",value:"value",animate:true }'></d3-circle>

	var dataset = [{ name:'Aaaaaaaaaaaaaaaaaaaaaaaaa1', value: 10}, {name : 'Aaaaaaa2', value: 40}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa4', value: 100} ]

## 남은 이것저것
아직은 여러가지로 부족합니다. 이놈을 실제 업무에 적용하기에는 아직 여러가지로 구현이 안된 기능이 많아요.  
하지만 조금씩 수정하며 보완해 나갔으면 하는데, 시간이 문제네요.  
vuejs를 처음 공부하시는 분들에게 조금이나마 도움이 되었으면 합니다.  

장고에서 사용해 봤습니다.  
https://github.com/ramoi/toobuk_vue  

## 참고 사이트 
https://vuejs.org/  
https://router.vuejs.org/  
https://bootstrap-vue.js.org/

https://d3js.org/  
http://bl.ocks.org/emmasaunders/c25a147970def2b02d8c7c2719dc7502

### 챠트 
https://codelib.tistory.com/10  
https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript  
http://blog.naver.com/sol9501/220199577721
