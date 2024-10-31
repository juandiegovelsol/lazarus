import React, { useState, useEffect, useRef } from "react";

const App = () => {
  // State to hold the original data
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  // State to hold the items currently being displayed
  const [displayedItems, setDisplayedItems] = useState([]);
  // Ref to store the IntersectionObserver instance
  const observerRef = useRef();
  // Ref to reference the list container element
  const listRef = useRef();
  // Ref to store the current scroll position
  const scrollPositionRef = useRef(0);
  // State to manage the popup visibility and its content
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupItem, setPopupItem] = useState(null);
  const [popupItemIndex, setPopupItemIndex] = useState(null);

  // Initialize displayedItems with twice the original data
  useEffect(() => {
    setDisplayedItems([...data, ...data]);
  }, [data]);

  // Setup the IntersectionObserver to load more items when reaching the end
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayedItems((prev) => [...prev, ...data]);
      }
    });
    // Observe the 'end' element to trigger loading more items
    if (observerRef.current && document.getElementById("end")) {
      observerRef.current.observe(document.getElementById("end"));
    }
    // Cleanup the observer when the component unmounts or dependencies change
    return () => observerRef.current && observerRef.current.disconnect();
  }, [displayedItems]);

  // Handler to add a new item to the data list
  const handleAddItem = () => {
    const newItem = data.length + 1;
    preserveScrollPosition(() => {
      setData((prev) => [...prev, newItem]);
    });
  };

  // Handler to delete an item from the data list
  const handleDeleteItem = () => {
    const newData = [...data];
    newData.splice(popupItemIndex, 1);
    preserveScrollPosition(() => {
      setData(newData);
      setPopupVisible(false);
    });
  };

  // Handler to edit an item in the data list
  const handleEditItem = () => {
    const newData = [...data];
    const newItem = prompt("Enter new value:", popupItem);
    if (newItem !== null && newItem.trim() !== "") {
      newData[popupItemIndex] = parseInt(newItem, 10);
      preserveScrollPosition(() => {
        setData(newData);
        setPopupItem(newData[popupItemIndex]);
      });
    }
  };

  // Function to scroll the list to the top
  const scrollToTop = () => {
    listRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to preserve the current scroll position during state updates
  const preserveScrollPosition = (updateFunction) => {
    scrollPositionRef.current = listRef.current.scrollTop;
    updateFunction();
  };

  // Restore the scroll position after displayedItems changes
  useEffect(() => {
    if (scrollPositionRef.current)
      listRef.current.scrollTo({ top: scrollPositionRef.current });
  }, [displayedItems]);

  // Function to handle list item clicks and show the popup
  const handleItemClick = (item, index) => {
    setPopupItem(item);
    setPopupItemIndex(index % data.length);
    setPopupVisible(true);
  };

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
            onClick={() => handleItemClick(item, index)}
          >
            <span style={{ flex: 1 }}>Item {item}</span>
          </div>
        ))}
        <div id="end" style={{ height: "1px" }} />
      </div>
      {popupVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setPopupVisible(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontSize: "24px", marginBottom: "20px" }}>
              Item {popupItem}
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleEditItem}>Edit</button>
              <button onClick={handleDeleteItem}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
