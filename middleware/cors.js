const corsHeaders = (req,res,next) => {
  // change wildcard * to real address of client once we have it!
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", 'Origin, x-Requested-With, Content-Type, Accept, Authorization')
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE")
  next()
}

module.exports = corsHeaders;
// export default corsHeader;