import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import {
  getZeroStyle,
  shouldStopAnimation,
  stepCurrentStyle,
  propsCompare
} from './util.js'

// 上一次的状态用state中的lastStyle来记录
// 当下的状态用state中的currentStyle来记录，这也是要传递给子组件的
// 目标状态用this.props.style来记录
// 用时间来控制，根据初始状态和终点状态，以及中间的具体时刻，确定当下状态
// 当该组件初始化时，lastStyle应该是null，这是要根据目标状态做一个归零版的状态
// 

const msPerFrame = 1000/60
let clock = typeof performance === "object" && performance.now ? performance : Date
// let setFrame = typeof window === "object" && window.requestAnimationFrame 
//     ? window.requestAnimationFrame.bind(window) 
//     : function(f) { setTimeout(f, 17); };
let setFrame =function(f) { setTimeout(f, 17); };

class Motion extends React.Component{
  static propTypes = {
    // TOOD: warn against putting a config in here
    defaultStyle: PropTypes.objectOf(PropTypes.number),
    style: PropTypes.objectOf(PropTypes.number),
    children: PropTypes.func.isRequired,
    onRest: PropTypes.func,
  };
  
  constructor(props){
    super(props)
    this.state=this.defaultState()
    // this.state = defaultState()
  }

  // 控制是否继续渲染
  unmounting = false
  wasAnimating = false
  // 类似于一个定时器的返回值，
  animationID = null
  prevTime = 0
  accumulatedTime = 0

  unreadPropStyle = null
  initFlag = false
  duration = 0

  
  defaultState(){
    const style= this.props.style
    let lastStyle = getZeroStyle(style)
    return {
        lastStyle,
        currentStyle:lastStyle
      }
  }

  // 该函数循环调用自身进行动画
  startAnimationIfNecessary(){

    // 如果它正在卸载
    if(this.unmounting||this.animationID!=null){
      return 
    }
    
    // 动画时间超过动画应当的持续时间时，返回
    if(this.accumulatedTime>this.duration){
      this.setState({
        lastStyle:this.props.style,
        currentStyle:this.props.style
      })
      this.accumulatedTime = 0
      this.wasAnimating = false
      this.animationID = null
      return
    }

    this.animationID = setFrame(()=>{
      // 如果要卸载该组件了
      if(this.unmounting){
        return 
      }

      let propStyle = this.props.style
      // 从属性差值上看是否要停止渲染
      
      if(shouldStopAnimation(this.state.currentStyle,propStyle)){
        this.animationID = null
        this.wasAnimating = false
        this.accumulatedTime = 0
        this.setState({
          lastStyle:this.state.currentStyle
        })
        return 
      } 
      // 进入渲染环节
       this.wasAnimating = true;
       this.accumulatedTime = clock.now() - this.prevTime
       let timeRatio =  this.accumulatedTime/this.duration
       
       timeRatio = timeRatio>1?1:timeRatio
       timeRatio = timeRatio<0?0:timeRatio
      //  this.prevTime = currentTime
       // 计算出当下时间所需要的属性差值
      //  console.log("time",this.accumulatedTime,this.prevTime,timeRatio)
      //  console.log("---------this.state.currentStyle,propStyle",this.state.currentStyle,propStyle)
       let styleDelta = stepCurrentStyle(this.state.lastStyle,this.state.currentStyle,propStyle,timeRatio)
      //  console.log("Animation---currentStyle",styleDelta)
        this.setState(prevState=>{
         let newStyle = {
           lastStyle:{...prevState.lastStyle},
           currentStyle:{...prevState.currentStyle}
         }
         let cStyle = prevState.currentStyle
         for(let v in cStyle){
           if(typeof cStyle[v] === "number"){
              newStyle.currentStyle[v] +=styleDelta[v]
           }
         }
         return newStyle
       })
       this.startAnimationIfNecessary()
    })
  }

  // 卸载该组件的时候
  componentWillUnmount(){
    // 表示正在卸载
    this.unmounting = true
    // 如果还有渲染定时器事务进行中的话，取消
    if(this.animationID != null){
      // 取消定时器的任务
      setFrame.cancel(this.animationID)
      this.animationID = null
    }
  }

  // shouldComponentUpdate(nextProps){
  //   console.log("propsCompare",this.props.style,nextProps.style)
  //   if(!propsCompare(this.props.style,nextProps.style)){
  //     //  前后两次传递的props不一样的话：
  //     this._componentWillReceiveProps(nextProps)
  //     return true
  //   }else{
  //     return false
  //   }
  // }
  // "更新"时接收参数
  UNSAFE_componentWillReceiveProps(props){
    // 如果不存在上一次的状态，则根据当下props初始化lastStyle
    if(!propsCompare(this.props.style,props.style)){
      if(!this.initFlag){
        this.initFlag = true
        let lastStyle = getZeroStyle(props.style)
        this.setState({lastStyle})
      }
      if(this.animationID == null){

        
        this.prevTime = clock.now()
        // 表示该动画持续多长时间
        this.duration = this.props.duration
        // console.log("this.animationID",this.prevTime,this.duration)
        this.startAnimationIfNecessary()
      }
    }
  }

  // "首次"加载该组件
  componentDidMount(){

    if(!this.initFlag){
      this.initFlag = true
      let lastStyle = getZeroStyle(this.props.style)
      this.setState({
        lastStyle,
        currentStyle:lastStyle
      })
    }
    this.prevTime = clock.now()
    // 表示该动画持续多长时间
    this.duration = this.props.duration
    // console.log("motion-duration",this.duration,this.prevTime)
    this.startAnimationIfNecessary()
  }

  render(){
    // 将this.state.currentStyle放入其子组件中，就是通过这步去传递参数
    const renderedChildren = this.props.children(this.state.currentStyle);
    
    // console.log("render--currentstyle",this.state.currentStyle)
    
    // 当renderedChildren存在时，返回React.Children.only(renderedChildren)
    // 验证children里只有唯一的孩子并返回他。否则这个方法抛出一个错误。
    return renderedChildren && React.Children.only(renderedChildren);
  }
}

export default Motion
