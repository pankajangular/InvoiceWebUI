export enum ApiEndPoint {

  // Login Register Api EndPoints
  login = 'Account/Login',
  register = 'Account/Register',
  confirmEmail = 'Account/ConfirmEmail',
  resendOtp = 'Account/ResendEmail',
  forgotPassword = 'Account/ForgotPassword',
  resetPassword = 'Account/ResetPassword',
  changePassword = 'Account/ChangePassword',


  // Invoice Api End-Points
  invoiceList = 'Invoice/InvoiceList',
  getInvoiceById = 'Invoice/GetInvoice',
  deleteInvoice = 'Invoice/DeleteInvoice',


  // User Business Api End Points

  linkedUsers = 'User/LinkedUsers',




  // Item Api End Points

  addNewItem = 'Management/CreateItem',
  itemList = 'Management/ItemList',
  getItemById = 'Management/GetItem',
  deleteItem = 'Management/DeleteItem',



  // Customer Api End-Points

  addNewCustomer = 'Management/CreateCustomer',
  getCustomerById = "Management/GetCustomer",
  deleteCustomer = 'Management/DeleteCustomer',
  customersList = 'Management/CustomerList',

}
