import { ZodIssue } from "zod";

export const getFailedAttributesMessage = (issues: ZodIssue[]): string => {
    const errorMessages: string[] = [];
    for (const issue of issues) {
      const attribute = issue.path.join(".");
      let errorMessage = "";

    switch (issue.code) {
      case "invalid_type":
        errorMessage = `Tipo inválido para el atributo ${attribute}: Se esperaba ${issue.expected}, se recibió ${issue.received}`;
        break;
      // Agregar más casos para otros códigos de error según necesidades
      default:
        errorMessage = `Error en el atributo ${attribute}: ${issue.message}`;
        break;
    }
      errorMessages.push(errorMessage);
    }
    return errorMessages.join(", ");
  }