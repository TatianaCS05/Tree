class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null; // Hijo izquierdo
        this.right = null; // Hijo derecho
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Método para agregar el abuelo
    setGrandparent(value) {
        if (!this.root) {
            this.root = new TreeNode(value);
        } else {
            alert("El abuelo ya está establecido.");
        }
    }

    // Método para agregar padres
    addParent(grandparentValue, parentValue) {
        const grandparent = this.findNode(this.root, grandparentValue);
        if (grandparent) {
            if (!grandparent.left || !grandparent.right) {
                const newParent = new TreeNode(parentValue);
                if (!grandparent.left) {
                    grandparent.left = newParent;
                } else {
                    grandparent.right = newParent;
                }
            } else {
                alert("El abuelo ya tiene dos padres.");
            }
        } else {
            alert("El abuelo no fue encontrado.");
        }
    }

    // Método para agregar hijos
    addChild(parentValue, childValue) {
        const parent = this.findNode(this.root, parentValue);
        if (parent) {
            if (!parent.left || !parent.right) {
                const newChild = new TreeNode(childValue);
                if (!parent.left) {
                    parent.left = newChild;
                } else {
                    parent.right = newChild;
                }
            } else {
                alert("Este padre ya tiene dos hijos.");
            }
        } else {
            alert("El padre no fue encontrado.");
        }
    }

    // Método para actualizar un nodo
    updateNode(oldValue, newValue) {
        const node = this.findNode(this.root, oldValue);
        if (node) {
            node.value = newValue;
        } else {
            alert("El nodo no fue encontrado.");
        }
    }

    // Método para eliminar un nodo
    deleteNode(value) {
        this.root = this.deleteRecursively(this.root, value);
    }

    // Método recursivo para eliminar un nodo
    deleteRecursively(node, value) {
        if (!node) return null;

        if (node.value === value) {
            // Nodo encontrado
            if (!node.left && !node.right) {
                return null; // Sin hijos
            }
            if (!node.left) {
                return node.right; // Solo tiene hijo derecho
            }
            if (!node.right) {
                return node.left; // Solo tiene hijo izquierdo
            }

            // Nodo con dos hijos, encontrar el mínimo en el subárbol derecho
            const minNode = this.findMin(node.right);
            node.value = minNode.value; // Reemplazar el valor
            node.right = this.deleteRecursively(node.right, minNode.value); // Eliminar el mínimo
        } else if (value < node.value) {
            node.left = this.deleteRecursively(node.left, value);
        } else {
            node.right = this.deleteRecursively(node.right, value);
        }
        return node;
    }

    // Método para encontrar el mínimo en un subárbol
    findMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    // Método para encontrar un nodo
    findNode(node, value) {
        if (!node) return null;
        if (node.value === value) return node;
        return this.findNode(node.left, value) || this.findNode(node.right, value);
    }

    // Método para renderizar el árbol en el HTML
    render() {
        const treeContainer = document.getElementById('tree');
        const valuesContainer = document.getElementById('nodeList');
        treeContainer.innerHTML = ''; // Limpiar el contenido previo
        valuesContainer.innerHTML = ''; // Limpiar la lista de valores

        if (this.root) {
            this.displayNode(this.root, treeContainer);
            const values = this.getValues(this.root);
            this.displayValues(values, valuesContainer);
        }
    }

    // Función recursiva para mostrar cada nodo
    displayNode(node, container) {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'node';
        nodeElement.textContent = node.value;

        const leftContainer = document.createElement('div');
        leftContainer.className = 'left';
        const rightContainer = document.createElement('div');
        rightContainer.className = 'right';

        if (node.left) {
            this.displayNode(node.left, leftContainer);
        }

        if (node.right) {
            this.displayNode(node.right, rightContainer);
        }

        nodeElement.appendChild(leftContainer);
        nodeElement.appendChild(rightContainer);
        container.appendChild(nodeElement);
    }

    // Método para obtener todos los valores del árbol
    getValues(node) {
        let values = [];
        if (node) {
            values.push(node.value);
            values = values.concat(this.getValues(node.left));
            values = values.concat(this.getValues(node.right));
        }
        return values;
    }

    // Método para mostrar los valores en una lista
    displayValues(values, container) {
        values.forEach(value => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
            container.appendChild(row);
        });
    }
}

// Crear el árbol
const binaryTree = new BinaryTree();

// Función para establecer el abuelo
function setGrandparent() {
    const grandparentValue = document.getElementById('grandparentName').value;

    if (!grandparentValue) {
        alert("Debes introducir un valor para el abuelo.");
        return;
    }

    binaryTree.setGrandparent(grandparentValue);
    binaryTree.render();
    clearInputs();
}

// Función para agregar padre
function addParent() {
    const grandparentValue = document.getElementById('grandparentName').value;
    const parentValue = document.getElementById('parentName').value;

    if (!parentValue) {
        alert("Debes introducir un valor para el padre.");
        return;
    }

    binaryTree.addParent(grandparentValue, parentValue);
    binaryTree.render();
    clearInputs();
}

// Función para agregar hijo
function addChild() {
    const parentValue = document.getElementById('parentName').value;
    const childValue = document.getElementById('childName').value;

    if (!childValue) {
        alert("Debes introducir un valor para el hijo.");
        return;
    }

    binaryTree.addChild(parentValue, childValue);
    binaryTree.render();
    clearInputs();
}

// Función para actualizar un nodo
function updateNode() {
    const oldValue = document.getElementById('oldValue').value;
    const newValue = document.getElementById('newValue').value;

    if (!oldValue || !newValue) {
        alert("Debes introducir valores para el nodo a actualizar.");
        return;
    }

    binaryTree.updateNode(oldValue, newValue);
    binaryTree.render();
    clearInputs();
}

// Función para eliminar un nodo
function deleteNode() {
    const value = document.getElementById('deleteValue').value;

    if (!value) {
        alert("Debes introducir un valor para eliminar el nodo.");
        return;
    }

    binaryTree.deleteNode(value);
    binaryTree.render();
    clearInputs();
}

// Función para limpiar los campos de entrada
function clearInputs() {
    document.getElementById('grandparentName').value = '';
    document.getElementById('parentName').value = '';
    document.getElementById('childName').value = '';
    document.getElementById('oldValue').value = '';
    document.getElementById('newValue').value = '';
    document.getElementById('deleteValue').value = '';
}
