import { useState, useEffect } from 'react';
import schema from '../schema/input_data'
import {jsonGenerator} from '../logic/json_generator';


 const Validator = () =>{

     const [inputSchema, setInputSchema] = useState();
     const [result, setResult] = useState(JSON.stringify({}));

     useEffect(() => {
         setInputSchema(JSON.stringify(schema, undefined, 2));
     }, []);

     const handleOnChange = (e) =>{
         e.preventDefault();
         setInputSchema(e.target.value);
     };

     const getNewSchema = ()=>{
         setResult(JSON.stringify(jsonGenerator(JSON.parse(inputSchema)), undefined, 2));
     };
    return (
        <div>
            <section className="App-body">
                <div className="left">
                    <h3>Schema:</h3>
                    <textarea onChange={e => handleOnChange(e)} value={inputSchema} />
                </div>
                <div className="right">
                    <h3>Result:</h3>
                    <textarea readOnly value={result} />
                </div>

            </section>
            <button onClick={getNewSchema}>Generate</button>

        </div>

    )

}

export default Validator
