const users=[
  {username:"andi",password:"andi123"},
  {username:"elpran",password:"nay123"},
  {username:"kacu",password:"beegay123"},
  {username:"rehan",password:"financialfreedom"},
  {username:"farhan",password:"nanags"},
  {username:"arga",password:"amir"},
  {username:"unzila",password:"zilzil"},
  {username:"anu1",password:"anu1"}

];

export default function handler(req,res){
  const {password}=req.body||{};
  const user=users.find(u=>u.password===password);
  if(!user) return res.status(401).json({success:false});
  res.json({success:true,username:user.username});
}
