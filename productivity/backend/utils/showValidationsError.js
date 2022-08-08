//function for displaying error
const showValidationsError = (req,res,next,schema)=>{

    // const { error, value } = schema.validate(req.body,{abortEarly:false,errors:{label:'key'},wrap: {label: false},allowUnknown:true});
    const { error, value } = schema.validate(req.body,{abortEarly:false,errors:{label:'key'},wrap: {label: false}});
    if(!error){
        next()
    }else{
        const err = error.details

        let validationErrors = {}
        err.forEach((item) => {
            validationErrors[item.context.key] = item.message
        });
        res.status(400).send(
            {
                errors:{...validationErrors},
                success:false
            }
        ) 
    }
}

export default showValidationsError