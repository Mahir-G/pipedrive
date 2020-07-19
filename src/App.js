import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import Form from './form';
import { BrowserRouter,Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const itemsFromBackend = [
  {id: uuid(), content: 'First Task'},
  {id: uuid(), content: 'Second Task'}
]
const columnsFromBackend = 
  {
    [uuid()]: {
      name: 'Lead In',
      items: itemsFromBackend,
      profit: 0
    },
    [uuid()]: {
      name: 'Contact Made',
      items: [],
      profit: 0,
    },
    [uuid()]: {
      name: 'Demo Scheduled',
      items: [],
      profit: 0
    },
    [uuid()]: {
      name: 'Proposal Made',
      items: [],
      profit: 0
    },
    [uuid()]: {
      name: 'Negotiations Started',
      items: [],
      profit: 0
    },
  };

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId];
    const coppiedItems = [...column.items];
    const [removed] = coppiedItems.splice(source.index, 1);
    coppiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: coppiedItems
      }
    });
  }
};



function App() {
    
  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <BrowserRouter>
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>{column.name}</h2>
            <div style={{ margin: 8 }}>
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref = {provided.innerRef}
                    style = {{
                      backgroundColor: snapshot.isDraggingOver ? 'lightblue' : '#f5f5f5',
                      padding: 4,
                      width: 220,
                      minHeight: 500
                    }}
                  >
                    {column.items.map((item, index) => {
                      return (
                        <Link>
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div 
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  padding: 16,
                                  margin: '0 0 8px 0',
                                  minHeight: '50px',
                                  backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                  color: 'white',
                                  ...provided.draggableProps.style
                                }}>
                                  <Route component={Form} path="/form" />
                              </div>
                            )
                          }}
                        </Draggable>
                        </Link>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
            </div>
            </div>
          )
        })}
      </DragDropContext>
    </div>
    <div>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
