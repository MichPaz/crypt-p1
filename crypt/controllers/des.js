const exec = require('child_process').execSync

function generateInput(body) {
  return `${body.message}\n${body.key}\n${body.option === 'dec' ? 'y' : 'n'}`
}

function crypt(req, res) {

  try {
    const content = generateInput(req.body)
    // console.log(content)
    let result = exec(`echo "${content}" | python3 ./algorithm/des.py`).toString()
    console.log('aa')
    console.log(result)
    result = result.replace(/.*ypted Message: /, '')
    console.log(result)
    res.status(200).send({ message: result.slice(0, -5) });
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
}

module.exports = { crypt };
