# Antes de empezar

## Guia para utilizar este template

El template utiliza algunas dependencias basicas para su funcionamiento, estas son:

- react-router-dom
- tailwindcss
- tailwind-merge
- react-use-form
- react-toastify
- zustand
- axios
- @tabler/icons-react

Ademas el template esta creado con Vite y typescript, cuenta hooks personalizados que adaptan las librerias utilizadas como tambien hooks de autoria propia que son de utilida a lo largo del desarrollo, si uno o varios de estos no son de utilidad pueden ser eliminados.
la estructura de carpetas utilizadas se centraliza en desarrollar cada parte del sistema por caracteristicas, por lo que cada funcionalidad del sistema deberia ser generada a parti de la carpeta features, idealmente se debe seguir el mismo patron de las carpetas feature en la parpetas views, para que hagan referencias unas a otras.

## Inicio

Para comenzar ejecuta uno de los comando mostrados a continuación, este template puede ser utilizado con cualquier gestor de dependencias, de preferencia yarn.

```
    yarn
    npm install
```

## Desarrollo

```
    yarn dev
    yarn dev -- --host // para levantar un servidor de desarrollo en lan
    npm run dev
    npm run dev -- --host // para levantar un servidor de desarrollo en lan
```

## Producción

Es importante revisar el archivo vite.config.ts, aqui es donde se determina el directorio de salida de la build de proudcción.

```
    yarn build
    npm run build
```

## importante

No olvidar cambiar nombre de proyecto en package.json

Este template tiene configurado eslint y prettier como herramientas de ayuda en el desarrollo, ademas de una configuración para los import alias de la estructura de carpetas utilizada.

⚡⚡⚡🦾🧠⚡⚡⚡
