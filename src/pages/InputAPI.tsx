import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { APIEndpointContext } from "../contexts/api-endpoint";

function InputAPI() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const apiContext = useContext(APIEndpointContext);

  const verify = () => {
    // a lógica abaixo é placeholder, mudar depois para verificar a API da maneira correta

    const url_regex = /^https:\/\/[a-z0-9]+\.lambda-url\.[a-z0-9-]+\.on\.aws\/?$/;

    if (url_regex.test(inputValue)) {
    
      apiContext?.setEndpoint(inputValue)

      navigate("/account");
    }

    else {
        alert("Insira um endpoint válido")
    }
  };

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <div className="w-[1000px] rounded-lg p-3 bg-sky-300 border-sky-950 text-blue-900 font-bold">
      <div className="flex justify-center mb-4">
                <h1 className="font-bold text-7xl">DevBank</h1>
            </div>
        <div className="flex justify-center mb-3">
          <input
            type="text"
            className="border border-blue-950 rounded-lg bg-blue-400 p-1 text-blue-950 w-[900px] placeholder:text-blue-900/70"
            placeholder="Insira o endpoint da API:"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button 
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition" 
            onClick={verify}
          >
            Prosseguir
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputAPI;