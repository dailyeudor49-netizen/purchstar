'use client';

import { useCallback } from 'react';
import { FacebookEventData, UserData } from '@/app/config/facebook';
import { generateEventId, trackPixelEvent, trackLead, trackPurchase } from '@/app/lib/facebook/pixel';
import { trackLeadCAPI, trackPurchaseCAPI, saveUserDataToStorage } from '@/app/lib/facebook/capi';

export function useFacebookTracking() {
  /**
   * Salva i dati utente per il tracking successivo
   */
  const saveUserData = useCallback((userData: UserData) => {
    saveUserDataToStorage(userData);
    console.log('[useFacebookTracking] User data saved:', userData);
  }, []);

  /**
   * Traccia un evento Lead (Pixel + CAPI)
   */
  const trackLeadEvent = useCallback(async (
    userData: UserData,
    eventData?: FacebookEventData
  ) => {
    const eventId = generateEventId();
    
    // Salva i dati utente
    saveUserDataToStorage(userData);
    
    // Traccia via Pixel
    trackLead(eventData, eventId);
    
    // Traccia via CAPI
    await trackLeadCAPI(eventId, userData, eventData);
    
    console.log('[useFacebookTracking] Lead event tracked with eventId:', eventId);
  }, []);

  /**
   * Traccia un evento Purchase (Pixel + CAPI)
   */
  const trackPurchaseEvent = useCallback(async (
    userData: UserData,
    eventData: FacebookEventData
  ) => {
    const eventId = generateEventId();
    
    // Salva i dati utente
    saveUserDataToStorage(userData);
    
    // Traccia via Pixel
    trackPurchase(eventData, eventId);
    
    // Traccia via CAPI
    await trackPurchaseCAPI(eventId, userData, eventData);
    
    console.log('[useFacebookTracking] Purchase event tracked with eventId:', eventId);
  }, []);

  /**
   * Traccia un evento generico solo via Pixel
   */
  const trackEvent = useCallback((
    eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout',
    eventData?: FacebookEventData
  ) => {
    const eventId = generateEventId();
    trackPixelEvent(eventName, eventData, eventId);
    console.log(`[useFacebookTracking] ${eventName} event tracked with eventId:`, eventId);
  }, []);

  return {
    saveUserData,
    trackLeadEvent,
    trackPurchaseEvent,
    trackEvent,
  };
}
