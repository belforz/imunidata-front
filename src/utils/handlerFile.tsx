import Papa from "papaparse";
import { Notifications } from "../components/notifications";

export function handlerFile(file: File): void {
  if (file.type == "application/json") {
    const handleFileJSON = new FileReader();
    handleFileJSON.readAsText(file, "UTF-8");
    handleFileJSON.onload = (e) => {
      const json = JSON.parse(e.target?.result as string);
      console.log(json);
    };
  } else if (file.type == "text/csv") {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      skipFirstNLines: 0,
      complete: (results) => {
        console.log("Dados convertidos:", results.data);
      },
    });
  } else {
    Notifications(
      "error",
      "Tipo de arquivo não suportado",
      "Por favor, envie um arquivo JSON ou CSV.",
    );
  }
}
