import { Provider } from "react-redux"
import Body from "./components/Body/Body"
import Browse from "./components/Browse/Browse"
import appStore from "./utils/appStore"
function App() {

  return (
    <Provider store={appStore}>
      <Body/>
    </Provider>
  )
}

export default App
