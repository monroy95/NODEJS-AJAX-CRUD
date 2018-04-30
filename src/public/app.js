$(function () {
    $('#getProducts').on('click', function () {
        $.ajax({
            url: '/products',
            success: function (products) {
                let tbody = $('tbody');

                tbody.html('');
                products.forEach(product => {
                    tbody.append(`
                    <tr>
                    <td class="id">${product.id}</td>
                    <td>
                        <input type="text" class="name" value="${product.name}"/>
                    </td>
                    <td>
                        <button class="update-button">Actualizar</button>
                        <button class="delete-button">Eliminar</button>
                    </td>
                    </tr>
                    `)
                });
            }
        });
    });
    $('#productForm').on('submit', function (e) {

        e.preventDefault();

        let newProduct = $('#newProduct');

        $.ajax({
            url: '/products',
            method: 'POST',
            data: {
                name: newProduct.val()
            },
            success: function (response) {
                $('#getProducts').click();
            }
        });
    });

    $('table').on('click', '.update-button', function () {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
        let name = row.find('.name').val();

        $.ajax({
            url: "/products/" + id,
            method: 'PUT',
            data: {
                name
            },
            success: function (response) {
                $('#getProducts').click();
            }
        });
    });
    $('table').on('click', '.delete-button', function () {
        let row = $(this).closest('tr');
        let id = row.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            success: function (response) {
                console.log(response);
                $('#getProducts').click();
            }
        });
    });

});