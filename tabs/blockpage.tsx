import React, { useState, useEffect } from 'react';
import styles from './blockpage.module.css';
import avatarImage from '/assets/icons/Blockpage_avatar.png';

function DeltaFlyerPage() {
    const [isAnimating, setAnimating] = useState(true);

    const toggleAnimation = () => {
        setAnimating(!isAnimating);
    };

    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
      // Delay the speech bubble appearance
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 2000); // Wait for 2 seconds after the image slides in

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2>Sorry, the last page didn't help you reach your goal.</h2>
          <p>If you reached this, this means you went off task.</p>
        </div>
        <div className={styles.imageContainer}>
          <img src={avatarImage} alt="Animated Character" />
          {showBubble && (
            <div className={styles.speechBubble}>
              <p>Hey champ, remember to stay focused. Let's close this
                page and get back to work, You got this!
              </p>
            </div>
          )}
        </div>
      </div>

    )
}

export default DeltaFlyerPage;
