import { createTransport } from 'nodemailer';

// Configurar el transporte SMTP de Nodemailer
const transporter = createTransport({
    service: 'gmail',  // O cualquier otro servicio SMTP que uses
    auth: {
        user: "patricioperezjudo@gmail.com",  // Tu correo de Gmail
        pass: "ecmsphjdvjeoqhzl",  // Tu contraseña de Gmail o una App password
    },
});

export default async (req, res) => {
    if (req.method === 'POST') {
        const { to, subject, message } = req.body;

        // Configuración del correo
        const mailOptions = {
            from: "patricioperezjudo@gmail.com",  // Correo de envío
            to:  "patricioperezjudo@gmail.com",    // Correo de destino
            subject,                        // Asunto
            message,                           // Contenido del correo
        };

        // Intentar enviar el correo
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Correo enviado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al enviar el correo' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
};
