# vue-d3

commit된 파일 중 install 파일을 보면 그대로 하면 설치하실수 있을겁니다.
기본적으로는 node와 vue-cli가 설치된 상황이라 가정한 문서입니다. 참고하셔서 봐주시길

vuejs를 공부하면서 어떤 주제로 이것을 활용할까 생각을 해보다가 d3js를 선택했습니다. 그런데 작업을 하면서 가장 힘들었던 부분이 d3였습니다.
개발자로 살아오면서 가장 힘들게 느껴지는 부분이 html인데 원하는데로 모양이 안나오니 삽질만 하게 되더군요
생각해보면, 아직 미진한 부분이 많습니다.
complex라든지, y축을 오른쪽에 설정하는 것 등등
모두 vuejs 보다는 d3에 문제되는 부분이라 공부를 하면서 그때, 그때 수정하려 하고 있습니다.

구성은 vue-router를 이용하여 SPG


src/components/d3 디렉토리에서 관련 vue 소스를 확인할 수 있습니다
Line 챠트의 경우 line.vue 이며, 바챠트의 경우는 bar.vue, 파이챠트는 circle.vue 입니다..

src/components/sample 디렉토리에서 샘플 소스를 확인할 수 있습니다.

1. Line 챠트
   데이타  형식이 두가지 입니다. 1.1 은 하나의 시리즈당 데이타가 배열로 들어 있다면 1.2는 전통적인 데이타베이스를 쿼리했을 때의 형식입니다.
   아래에서 확인 할 수 있습니다.
   
   1.1 첫번째 형식입니다.
       태그: 중요한 것은 conf 설정의 "y"값입니다. 문자열로 받고 있습니다.
       <d3-line id='p' ref='p' title='추이' :width=700 :height=320 :conf='{series:"year", x:"month", y:"price"}'></d3-line>
   
       데이타 : 아래와 같은 형식으로 넣어줍니다.
       var dataset = [ 
          { year : '2017', data : [{month:1, price:17}, {month:2, price:27}, {month:3, price:37}, {month:4, price:27}, {month:5, price:17}, {month:6, price:7},  {month:7, price:9}, {month:8, price:19}, {month:9, price:29}, {month:10, price:19}, {month:11, price:9}, {month:12, price:0}] },
          { year : '2018', data : [{month:1, price:9}, {month:2, price:19}, {month:3, price:29}, {month:4, price:39}, {month:5, price:29}, {month:6, price:19}, {month:7, price:9}, {month:8, price:7}, {month:9, price:17}, {month:10, price:27}, {month:11, price:17}, {month:12, price:7}] }
        ]
        
        호출은 아래와 같습니다.
        this.$refs.p.setSource( dataset )
        
        
   1.2 두번째 형식입니다. 위와는 다르게 conf 설정의 y값이 배열입니다.
       태그 : <d3-line id='houseProgress' ref='houseProgress' title='추이' :width=700 :height=320 :conf='{xName:"년월", yName:"증감율(%)", x:"DATE", y:["COUNTRY","CAPATIAL", "SEOUL", "SOUTH", "NORTH" ] }'></d3-line>
       
       데이타 : 
       var dataset2 = [{'DATE': 201802, 'COUNTRY': 0.2, 'CAPATIAL': 0.5, 'SEOUL': 0.9, 'SOUTH': 1.2, 'NORTH': 0.7}, {'DATE': 201803, 'COUNTRY': 0.1, 'CAPATIAL': 0.3, 'SEOUL': 0.6, 'SOUTH': 0.6, 'NORTH': 0.6}, {'DATE': 201804, 'COUNTRY': 0.1, 'CAPATIAL': 0.2, 'SEOUL': 0.3, 'SOUTH': 0.3, 'NORTH': 0.3}, {'DATE': 201805, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.2, 'SOUTH': 0.2, 'NORTH': 0.3}, {'DATE': 201806, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.2, 'SOUTH': 0.1, 'NORTH': 0.4}, {'DATE': 201807, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.3, 'SOUTH': 0.3, 'NORTH': 0.4}, {'DATE': 201808, 'COUNTRY': 0.0, 'CAPATIAL': 0.2, 'SEOUL': 0.6, 'SOUTH': 0.6, 'NORTH': 0.6}, {'DATE': 201809, 'COUNTRY': 0.3, 'CAPATIAL': 0.7, 'SEOUL': 1.3, 'SOUTH': 1.5, 'NORTH': 1.0}, {'DATE': 201810, 'COUNTRY': 0.2, 'CAPATIAL': 0.4, 'SEOUL': 0.5, 'SOUTH': 0.5, 'NORTH': 0.6}, {'DATE': 201811, 'COUNTRY': 0.1, 'CAPATIAL': 0.3, 'SEOUL': 0.2, 'SOUTH': 0.1, 'NORTH': 0.3}, {'DATE': 201812, 'COUNTRY': 0.0, 'CAPATIAL': 0.1, 'SEOUL': 0.0, 'SOUTH': -0.1, 'NORTH': 0.2}, {'DATE': 201901, 'COUNTRY': -0.1, 'CAPATIAL': -0.1, 'SEOUL': -0.2, 'SOUTH': -0.3, 'NORTH': -0.1}] 
       
       호출은 아래와 같습니다.
       this.$refs.houseProgress.setSource( dataset2 )
   
   위 내용은 sample 디렉토리의 Line.vue 에서 확인할 수 있습니다.

2. 바챠트
   바챠트는 우선, 데이타베이스 형식만 받았습니다. 아래 태그를 보면 차이를 느끼실 수 있을거예요..
   
    <d3-bar id='bar1' ref='bar1' title='Most loved programming languages' :width=1000 :height=600 :conf='{series:"language", x:"year", y:"value"}'></d3-bar>
    <d3-bar id='bar2' ref='bar2' title='Most loved programming languages' :width=1000 :height=600 :conf='{x:"language", y:"value"}'></d3-bar>
   
   데이타는 아래와 같습니다.
    const dataset = [
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
    
    this.$refs.bar1.setSource( dataset )
    this.$refs.bar2.setSource( dataset.slice(10) )
    
3. 원챠트
   원챠트는 단순합니다.
   <d3-circle id='c' ref='dept' title='통화량' :width=300 :height=300  :legend='{isShow: false}' :conf='{name:"name",value:"value",animate:true }'></d3-circle>
   
   [{ name:'Aaaaaaaaaaaaaaaaaaaaaaaaa1', value: 10}, {name : 'Aaaaaaa2', value: 40}, {name : 'Aaaaaaaaaaaaaaaaaaa3', value: 20}, {name : 'Aaaaaaaaaaaaaaaaaaa4', value: 100} ]
   
   this.$refs.c.setSource( arr[idx] )
   
   