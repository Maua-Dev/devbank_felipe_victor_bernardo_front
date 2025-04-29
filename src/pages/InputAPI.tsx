import { useNavigate } from "react-router-dom";
import { useState } from "react";

function InputAPI() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verify = async () => {
    if (inputValue !== "https://r2tcz6zsokynb72jb6o4ffd5nm0ryfyz.lambda-url.us-west-2.on.aws/") {
      alert("Insira um URL válido");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(inputValue, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accountData", JSON.stringify(data));
  
        navigate("/account");
      } else {
        alert("Erro ao conectar com a API. Verifique o URL e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro ao conectar com a API. Verifique o URL e tente novamente.");
    } finally {
      setIsLoading(false);
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
            className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300" 
            onClick={verify}
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Prosseguir"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputAPI;