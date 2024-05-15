export const MESSAGES = {
    USUARIO: {
      USER_NOT_FOUND: 'Usuario no encontrado',
      USER_FOUND: 'Usuario ya existe',
      LOGIN: {
        REQUEST_ROL_NEGOCIO_ADMIN: 'Solicite un rol o negocio al administrador.',
        USER_DISABLED: 'Su usuario esta desactivado, por favor comunicarse con servicio al cliente.',
        DATE_CONTEO: 'Ocurrio un error en el login con la fecha de conteos login',
        ACCOUNT_LOCKED_MAX_ATTEMPTS_MIN: (min: number): string => 'Tu cuenta esta bloqueada por sobrepasar el número de intentos pasa acceder, podras volver a intentarlo en ' +
        (5 - min) +
        ' minutos',
        ACCOUNT_LOCKED_MAX_ATTEMPTS: 'Tu cuenta fue bloqueada por exceder el número de intentos para ingresar',
        CREDENDIATLS_INCORRECT:'Las credenciales no son correctas',
        NOT_PROCESS_REGISTER: 'Error en login no existe proceso de registro',
        NOT_PROCESS_NEGOCIO: 'Error en login no existe proceso negocio',
        NOT_FOUND_INFORMACION_BANCARIA: 'Error en login no existe informacion bancaria',
        ERROR_CAPTCHA: 'No se pudo validar que eres humano',
      },
      REFRESH_LOGIN: {
        ERROR_REFRESH_LOGIN: 'Error al recargar, inicie sesión nuevamente por favor.',
      },
    },
  };
  