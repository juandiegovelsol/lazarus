import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const observerRef = useRef();
  const listRef = useRef();
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    setDisplayedItems([...data, ...data]);
  }, [data]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayedItems((prev) => [...prev, ...data]);
      }
    });
    if (observerRef.current && document.getElementById("end")) {
      observerRef.current.observe(document.getElementById("end"));
    }
    return () => observerRef.current && observerRef.current.disconnect();
  }, [displayedItems]);

  const handleAddItem = () => {
    const newItem = data.length + 1;
    preserveScrollPosition(() => {
      setData((prev) => [...prev, newItem]);
    });
  };

  const handleDeleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    preserveScrollPosition(() => {
      setData(newData);
    });
  };

  const handleEditItem = (index) => {
    const newData = [...data];
    const newItem = prompt("Enter new value:", data[index]);
    if (newItem !== null && newItem.trim() !== "") {
      newData[index] = parseInt(newItem, 10);
      preserveScrollPosition(() => {
        setData(newData);
      });
    }
  };

  const scrollToTop = () => {
    listRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const preserveScrollPosition = (updateFunction) => {
    scrollPositionRef.current = listRef.current.scrollTop;
    updateFunction();
  };

  useEffect(() => {
    listRef.current.scrollTo({ top: scrollPositionRef.current });
  }, [displayedItems]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button onClick={handleAddItem}>Add Item</button>
        <button onClick={scrollToTop}>Scroll to Top</button>
      </div>
      <div
        ref={listRef}
        style={{
          flexGrow: 1,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "20px",
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
          }}
        >
          <span style={{ flex: 1 }}>Item</span>
          <span style={{ flex: 1 }}>Actions</span>
        </div>
        {displayedItems.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              borderBottom: "1px solid #ccc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ flex: 1 }}>Item {item}</span>
            <div
              style={{
                display: "flex",
                gap: "5px",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <button onClick={() => handleEditItem(index % data.length)}>
                Edit
              </button>
              <button onClick={() => handleDeleteItem(index % data.length)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <div id="end" style={{ height: "1px" }} />
      </div>
    </div>
  );
};

export default App;
