import pygame
from pygame.locals import *
from OpenGL.GL import *
from OpenGL.GLUT import *
from OpenGL.GLU import *

class OBJLoader:
    def __init__(self, filename):
        self.vertices = []
        self.faces = []
        self.load(filename)

    def load(self, filename):
        with open(filename, 'r') as file:
            for line in file:
                # Parse vertex
                if line.startswith('v '):
                    _, x, y, z = line.strip().split()
                    self.vertices.append((float(x), float(y), float(z)))
                # Parse face
                elif line.startswith('f '):
                    face = []
                    for vertex in line.strip().split()[1:]:
                        vertex_index = int(vertex.split('/')[0]) - 1
                        face.append(vertex_index)
                    self.faces.append(face)

    def draw(self):
        glBegin(GL_TRIANGLES)
        for face in self.faces:
            for vertex_index in face:
                glVertex3fv(self.vertices[vertex_index])
        glEnd()

def main():
    # Initialize Pygame and OpenGL
    pygame.init()
    display = (800, 600)
    pygame.display.set_mode(display, DOUBLEBUF | OPENGL)
    gluPerspective(45, (display[0] / display[1]), 0.1, 50.0)
    glTranslatef(0.0, 0.0, -5)  # Move the camera back to see the model

    # Load .obj file
    filename = 'scaned.obj'
    obj_model = OBJLoader(filename)

    # Main rendering loop
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == KEYDOWN:
                if event.key == K_LEFT:
                    glRotatef(5, 0, 1, 0)  # Rotate left
                elif event.key == K_RIGHT:
                    glRotatef(-5, 0, 1, 0)  # Rotate right
                elif event.key == K_UP:
                    glRotatef(5, 1, 0, 0)  # Rotate up
                elif event.key == K_DOWN:
                    glRotatef(-5, 1, 0, 0)  # Rotate down

        # Clear screen and draw object
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        obj_model.draw()
        pygame.display.flip()
        pygame.time.wait(10)

    pygame.quit()

if __name__ == "__main__":
    main()
