import{u as p,j as a}from"./index-CAuxqyyI.js";import{a as f}from"./home-bIia-ANn.js";import{E as u}from"./index-B9Lku7qE.js";import{r}from"./react-CdDm0hN7.js";import{a8 as d,af as g}from"./antd-MPmAXGyh.js";import"./faker-CiQWN7dT.js";function _(){const{t:e}=p(),[n,i]=r.useState([]),[t,m]=r.useState(e("home.allChannels")),c={electronics:e("home.electronics"),home_goods:e("home.homeGoods"),apparel_accessories:e("home.apparelAccessories"),food_beverages:e("home.foodBeverages"),beauty_skincare:e("home.beautySkincare")},l={title:{text:"",subtext:"",right:"10%"},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{orient:"vertical",left:"left"},series:[{name:e("home.salesCategoryProportion"),type:"pie",radius:"55%",center:["50%","60%"],data:n}]};return r.useEffect(()=>{t&&f({by:t}).then(({result:o})=>{i(o.map(s=>{const h=s.code;return{...s,name:c[h]}}))})},[t]),a.jsx(d,{title:e("home.salesCategoryProportion"),extra:a.jsx(g,{options:[e("home.allChannels"),e("home.online"),e("home.site")],value:t,onChange:o=>m(o)}),children:a.jsx(u,{option:l})})}export{_ as default};