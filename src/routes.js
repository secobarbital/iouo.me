import owers from './owers'
import owees from './owees'
import transactions from './transactions'
import notfound from './notfound'

export default {
  '/': owers,
  '/owers/:ower': owees,
  '/owers/:ower/owees/:owee': transactions,
  '*': notfound
}
