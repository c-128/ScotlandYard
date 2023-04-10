/* @refresh reload */
import { render } from 'solid-js/web';
import PathFinder from './components/PathFinder';
import "@picocss/pico";

render(() => <>
  <App />
</>, document.getElementById('root')!);

function App() {
  return <>
    <div class="container-fluid">
      <PathFinder />
    </div>
  </>
}

