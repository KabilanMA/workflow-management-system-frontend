import './App.css';

import DropFileInput from './components/DropFileInput';

function App() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
        <div className="box">
            
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
        </div>
    );
}

export default App;
