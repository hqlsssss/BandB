export default{
  'post /api/user/detail':(req,res)=>{
    res.json({
      status:200,
      data:{
        id:10,
        username:'ceshi',
        avatar:'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg',
        tel:12345,
        sign:'...'
      }
    })
  },
  'post /api/user/edit':(req,res)=>{
    res.json({
      status:200,
      data:'ok'
    })
  },
  'post /api/user/login':(req,res)=>{
    res.json({
      status:200,
      data:{
        id:100,
        username:'admin'
      }
    })
  },
  'post /api/user/register':(req,res)=>{
    res.json({
      status:200,
      data:{
        id:100,
        username:'admin'
      }
    })
  }  
}