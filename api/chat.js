let messages=[];
const DAY=24*60*60*1000;

export default function handler(req,res){
  const now=Date.now();
  messages=messages.filter(m=>now-m.time<DAY);

  if(req.method==="POST"){
    const {user,text,time}=req.body;
    messages.push({user,text,time});
    return res.json({ok:true});
  }

  res.json(messages);
}
