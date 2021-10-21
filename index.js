const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/form", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        <h3>Email enviado desde Clinica STM</h3>
        <ul>
            <li>Email: ${req.body.correo}</li>
            <li>Asunto: Reserva de Hora Clinica STM</li>
        </ul>
        <h3>Datos Cita Médica</h3>
        <p>Rut del paciente: ${req.body.rut}</p>
        <p>Especialidad: ${req.body.especialidad}</p>
        <p>Sede: ${req.body.sede}</p>
        <p>Médico: ${req.body.medico}</p>
        <p>Fecha: ${req.body.fecha}</p>
        <p>Hora: ${req.body.hora}</p>
        <p>Paciente:${req.body.nombre}</p>
        <p>Correo: ${req.body.correo}</p>
        <p>Teléfono: ${req.body.telefono}</p>
        <p>GRACIAS POR PREFERIR NUESTRA ATENCIÓN ONLINE. </p>
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "ingresecorrreoclinica", //El email del servicio SMTP que va a utilizar (en este caso Gmail)
        pass: "contraseñaclinica" // La contraseña de dicho SMTP
      }
    });

    let mailOptions = {
      from: "clinicastmv1@gmail.com", // Quien manda el email
      to: req.body.correo, // El email de destino
      replyTo: "clinicastmv1@gmail.com",
      subject: "Reserva de Hora Clinica STM", // El asunto del email
      html: htmlEmail // La parte HTML del email
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log("Mensaje enviado: %s", info.mensaje);
      console.log("Url del mensaje: %s", nodemailer.getTestMessageUrl(info));
    });
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor a la escucha en el puerto ${PORT}`);
});
