import {payment, subscribe} from "../services/subscription.service.js";

export const paymentCont = async (req, res) => {
  try {
    const user = req.user;
    const { susbscriptionType } = req.body;
    const url = await payment(susbscriptionType, user.email);
    res.status(200).send({status: true, message: "None", url});
  } catch (error) {
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

export const susbcribeCont = async (req, res) => {
  try {
    const user = req.user;
    const { sessionId } = req.body;
    const status = await subscribe(sessionId, user.email);
    if(status){
      res.status(200).send({status: true, message: "Subscribe Successfully"});
    }else{
      re.status(403).send({status: false, message: "Not Successfully Subscribe"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({status: false, message: "Internal Server Error"});
  }
};

