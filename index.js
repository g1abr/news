function inicializarLikesDislikes() {
    const likesCountElement = document.getElementById('likesCount');
    const dislikesCountElement = document.getElementById('dislikesCount');

    let likesCount = 0;
    let dislikesCount = 0;

    const likeButton = document.getElementById('likeButton');
    const dislikeButton = document.getElementById('dislikeButton');

    likeButton.addEventListener('click', () => {
        toggleLike(likeButton, dislikeButton, likesCountElement, dislikesCountElement, likesCount, dislikesCount);
    });

    dislikeButton.addEventListener('click', () => {
        toggleDislike(likeButton, dislikeButton, likesCountElement, dislikesCountElement, likesCount, dislikesCount);
    });
}
function toggleLike(likeButton, dislikeButton, likesCountElement, dislikesCountElement, likesCount, dislikesCount) {
    if (likeButton.classList.contains('liked')) {
        likesCount = 0; // Establecer el contador de "Me gusta" a 0 cuando se quita el "Me gusta"
        likeButton.classList.remove('liked');
        likeButton.classList.add('opacity-75'); // Agregar opacidad cuando se quita el "Me gusta"
    } else {
        likesCount = 1;
        dislikesCount = 0;
        likeButton.classList.add('liked');
        dislikeButton.classList.remove('disliked');
        likeButton.classList.remove('opacity-75'); // Quitar opacidad cuando se da "Me gusta"
    }

    likesCountElement.textContent = likesCount;
    dislikesCountElement.textContent = dislikesCount;
}

function toggleDislike(likeButton, dislikeButton, likesCountElement, dislikesCountElement, likesCount, dislikesCount) {
    if (dislikeButton.classList.contains('disliked')) {
        dislikesCount = 0;
        dislikeButton.classList.remove('disliked');
        dislikeButton.classList.add('opacity-75');
    } else {
        dislikesCount = 1;
        likesCount = 0;
        dislikeButton.classList.add('disliked');
        likeButton.classList.remove('liked');
        dislikeButton.classList.remove('opacity-75');
    }

    likesCountElement.textContent = likesCount;
    dislikesCountElement.textContent = dislikesCount;
}



inicializarLikesDislikes();

function inicializarComentarios() {
    const commentButton = document.getElementById('coments');
    const commentForm = document.getElementById('commentForm');
    const textComments = document.getElementById('text-coments');
    const textCommentsDiv = document.getElementById('text-coments-div');
    const commentsCountElement = document.getElementById('commentsCount');
    const eliminarComentarioButton = document.getElementById('eliminarComentario');
    let commentsCount = 0;

    commentButton.addEventListener('click', () => {
        if (commentsCount === 0) {
            commentForm.style.display = 'block';
        } else {
            // Mostrar una alerta o mensaje de que solo se permite un comentario
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Solo se permite un comentario por usuario.'
            });
        }
    });

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (commentsCount === 0) {
            const commentText = textComments.value;
            if (commentText.trim() !== '') {
                // Mostrar el comentario en la sección de comentarios
                textCommentsDiv.textContent = commentText;
                commentsCount++;
                commentsCountElement.textContent = commentsCount;
                commentForm.style.display = 'none';

                
                // Mostrar el botón "Eliminar Comentario" cuando se envía el primer comentario
                eliminarComentarioButton.style.display = 'inline-block';
               

            } else {
                // Mostrar una alerta o mensaje de que el comentario no puede estar vacío
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor, ingresa un comentario válido.'
                });
            }
        }
    });

    // Usar SweetAlert2 para confirmar antes de eliminar el comentario
    eliminarComentarioButton.addEventListener('click', () => {
        if (commentsCount > 0) {
            Swal.fire({
                title: '¿Estás seguro de que deseas eliminar el comentario?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Eliminar el comentario solo si el usuario confirma
                    textCommentsDiv.textContent = 'No hay comentarios';
                    commentsCount = 0;
                    commentsCountElement.textContent = commentsCount;
                    textComments.value = ''; // Borrar el contenido del comentario
                    eliminarComentarioButton.style.display = 'none';
                    Swal.fire('Comentario eliminado', '', 'success');
                }
            });
        }
    });

    // Ocultar el botón "Eliminar Comentario" cuando se hace clic en él
    eliminarComentarioButton.addEventListener('click', () => {
        textCommentsDiv.textContent = 'No hay comentarios';
        commentsCount = 0;
        commentsCountElement.textContent = commentsCount;
        textComments.value = ''; // Borrar el contenido del comentario
        eliminarComentarioButton.style.display = 'none';
    });
}

// Llama a la función para inicializar comentarios
inicializarComentarios();
